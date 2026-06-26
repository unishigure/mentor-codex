import { deleteTale, getAllTales, saveTale, type Tale } from "@/lib/db";
import { dispatchTaleUpdated, type TaleUpdateDetail } from "@/lib/tale-events";

export const DRIVE_BACKUP_SCOPE =
  "https://www.googleapis.com/auth/drive.appdata";
export const DRIVE_BACKUP_FILE_NAME = "mentor-codex-backup.json";

const DELETED_TALES_STORAGE_KEY = "mentor-codex-deleted-tales";
const UPDATED_TALES_STORAGE_KEY = "mentor-codex-updated-tales";

type BackupTale = Omit<Tale, "dateTime"> & { dateTime: string };

type DeletedTale = {
  key: number;
  deletedAt: string;
};

type UpdatedTale = {
  key: number;
  updatedAt: string;
};

type BackupPayload = {
  app: "mentor-codex";
  schemaVersion: 1;
  exportedAt: string;
  tales: BackupTale[];
  deletedTales?: DeletedTale[];
  updatedTales?: UpdatedTale[];
};

type BackupFile = {
  id: string;
  name?: string;
  trashed?: boolean;
};

type DriveApiError = {
  error?: {
    message?: string;
    status?: string;
  };
};

async function createDriveError(
  response: Response,
  fallbackMessage: string,
): Promise<Error> {
  try {
    const data = (await response.json()) as DriveApiError;
    const message = data.error?.message ?? fallbackMessage;
    const status = data.error?.status ?? response.statusText;

    return new Error(`${message} (${response.status} ${status})`);
  } catch {
    return new Error(
      `${fallbackMessage} (${response.status} ${response.statusText})`,
    );
  }
}

function getDeletedTales(): DeletedTale[] {
  try {
    const rawValue = localStorage.getItem(DELETED_TALES_STORAGE_KEY);
    if (!rawValue) return [];

    const value = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(value)) return [];

    return value.filter(
      (item): item is DeletedTale =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as DeletedTale).key === "number" &&
        typeof (item as DeletedTale).deletedAt === "string",
    );
  } catch {
    return [];
  }
}

function saveDeletedTales(deletedTales: DeletedTale[]) {
  localStorage.setItem(DELETED_TALES_STORAGE_KEY, JSON.stringify(deletedTales));
}

function mergeDeletedTales(
  currentTales: DeletedTale[],
  nextTales: DeletedTale[],
): DeletedTale[] {
  const deletedTalesByKey = new Map<number, DeletedTale>();

  for (const tale of [...currentTales, ...nextTales]) {
    const current = deletedTalesByKey.get(tale.key);
    if (!current || current.deletedAt < tale.deletedAt) {
      deletedTalesByKey.set(tale.key, tale);
    }
  }

  return Array.from(deletedTalesByKey.values());
}

function recordDeletedTale(key: number) {
  saveDeletedTales(
    mergeDeletedTales(getDeletedTales(), [
      { key, deletedAt: new Date().toISOString() },
    ]),
  );
}

function getUpdatedTales(): UpdatedTale[] {
  try {
    const rawValue = localStorage.getItem(UPDATED_TALES_STORAGE_KEY);
    if (!rawValue) return [];

    const value = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(value)) return [];

    return value.filter(
      (item): item is UpdatedTale =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as UpdatedTale).key === "number" &&
        typeof (item as UpdatedTale).updatedAt === "string",
    );
  } catch {
    return [];
  }
}

function saveUpdatedTales(updatedTales: UpdatedTale[]) {
  localStorage.setItem(UPDATED_TALES_STORAGE_KEY, JSON.stringify(updatedTales));
}

function mergeUpdatedTales(
  currentTales: UpdatedTale[],
  nextTales: UpdatedTale[],
): UpdatedTale[] {
  const updatedTalesByKey = new Map<number, UpdatedTale>();

  for (const tale of [...currentTales, ...nextTales]) {
    const current = updatedTalesByKey.get(tale.key);
    if (!current || current.updatedAt < tale.updatedAt) {
      updatedTalesByKey.set(tale.key, tale);
    }
  }

  return Array.from(updatedTalesByKey.values());
}

function recordUpdatedTale(key: number) {
  saveUpdatedTales(
    mergeUpdatedTales(getUpdatedTales(), [
      { key, updatedAt: new Date().toISOString() },
    ]),
  );
}

function createBackupPayload(tales: Tale[]): BackupPayload {
  const deletedKeys = new Set(getDeletedTales().map((tale) => tale.key));

  return {
    app: "mentor-codex",
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    tales: tales
      .filter((tale) => !deletedKeys.has(tale.key))
      .map((tale) => ({
        ...tale,
        dateTime: new Date(tale.dateTime).toISOString(),
      })),
    deletedTales: getDeletedTales(),
    updatedTales: getUpdatedTales(),
  };
}

function parseBackupPayload(value: unknown): BackupPayload | null {
  if (typeof value !== "object" || value === null) return null;

  const payload = value as Partial<BackupPayload>;
  if (payload.app !== "mentor-codex" || payload.schemaVersion !== 1) {
    return null;
  }
  if (!Array.isArray(payload.tales)) return null;

  return payload as BackupPayload;
}

function restoreBackupTale(tale: BackupTale): Tale {
  return {
    ...tale,
    dateTime: new Date(tale.dateTime),
  };
}

async function findBackupFile(accessToken: string): Promise<BackupFile | null> {
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      spaces: "appDataFolder",
      fields: "nextPageToken,files(id,name,trashed)",
      pageSize: "100",
    });

    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw await createDriveError(
        response,
        "Failed to find Drive backup file",
      );
    }

    const data = (await response.json()) as {
      nextPageToken?: string;
      files?: BackupFile[];
    };
    const backupFile = data.files?.find(
      (file) => file.name === DRIVE_BACKUP_FILE_NAME && !file.trashed,
    );

    if (backupFile) return backupFile;

    pageToken = data.nextPageToken;
  } while (pageToken);

  return null;
}

async function downloadBackup(
  accessToken: string,
): Promise<BackupPayload | null> {
  const file = await findBackupFile(accessToken);
  if (!file) return null;

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw await createDriveError(
      response,
      "Failed to download Drive backup file",
    );
  }

  return parseBackupPayload(await response.json());
}

async function mergeBackupIntoLocal(
  backup: BackupPayload | null,
): Promise<boolean> {
  if (!backup) return false;

  const localUpdatedAtByKey = new Map(
    getUpdatedTales().map((tale) => [tale.key, tale.updatedAt]),
  );
  const remoteUpdatedAtByKey = new Map(
    (backup.updatedTales ?? []).map((tale) => [tale.key, tale.updatedAt]),
  );
  const deletedTales = mergeDeletedTales(
    getDeletedTales(),
    backup.deletedTales ?? [],
  );
  saveDeletedTales(deletedTales);

  const updatedTales = mergeUpdatedTales(
    getUpdatedTales(),
    backup.updatedTales ?? [],
  );
  saveUpdatedTales(updatedTales);

  const localTales = await getAllTales();
  const deletedKeys = new Set(deletedTales.map((tale) => tale.key));
  const localTalesByKey = new Map(localTales.map((tale) => [tale.key, tale]));
  const remoteTales = backup.tales.flatMap((tale) => {
    if (deletedKeys.has(tale.key)) return [];

    const localTale = localTalesByKey.get(tale.key);
    if (!localTale) return [restoreBackupTale(tale)];

    const remoteUpdatedAt =
      remoteUpdatedAtByKey.get(tale.key) ?? backup.exportedAt;
    const localUpdatedAt =
      localUpdatedAtByKey.get(localTale.key) ??
      new Date(localTale.dateTime).toISOString();

    return remoteUpdatedAt > localUpdatedAt ? [restoreBackupTale(tale)] : [];
  });
  const localTalesToDelete = localTales.filter((tale) =>
    deletedKeys.has(tale.key),
  );

  if (!remoteTales.length && !localTalesToDelete.length) return false;

  await Promise.all([
    ...remoteTales.map((tale) => saveTale(tale)),
    ...localTalesToDelete.map((tale) => deleteTale(tale.key)),
  ]);
  dispatchTaleUpdated();
  return true;
}

async function uploadBackup(
  accessToken: string,
  payload: BackupPayload,
): Promise<void> {
  const fileId = (await findBackupFile(accessToken))?.id ?? null;
  const metadata = fileId
    ? { name: DRIVE_BACKUP_FILE_NAME, mimeType: "application/json" }
    : {
        name: DRIVE_BACKUP_FILE_NAME,
        mimeType: "application/json",
        parents: ["appDataFolder"],
      };
  const boundary = "mentor-codex-backup-boundary";
  const body = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(payload),
    `--${boundary}--`,
  ].join("\r\n");
  const url = fileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
  const method = fileId ? "PATCH" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });

  if (!response.ok) {
    throw await createDriveError(
      response,
      "Failed to upload Drive backup file",
    );
  }
}

export function recordTaleMutation(detail: TaleUpdateDetail | undefined) {
  if (detail?.type === "delete" && typeof detail.key === "number") {
    recordDeletedTale(detail.key);
  }

  if (detail?.type === "save" && typeof detail.key === "number") {
    recordUpdatedTale(detail.key);
  }
}

export async function syncDriveBackup(accessToken: string): Promise<void> {
  await mergeBackupIntoLocal(await downloadBackup(accessToken));
  const tales = await getAllTales();
  await uploadBackup(accessToken, createBackupPayload(tales));
}
