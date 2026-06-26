export const TALE_UPDATE_EVENT = "tale:update";

export type TaleUpdateDetail = {
  type?: "save" | "delete";
  key?: number;
};

export function dispatchTaleUpdated() {
  window.dispatchEvent(new Event(TALE_UPDATE_EVENT));
}

export function dispatchTaleSaved(key: number) {
  window.dispatchEvent(
    new CustomEvent<TaleUpdateDetail>(TALE_UPDATE_EVENT, {
      detail: { type: "save", key },
    }),
  );
}

export function dispatchTaleDeleted(key: number) {
  window.dispatchEvent(
    new CustomEvent<TaleUpdateDetail>(TALE_UPDATE_EVENT, {
      detail: { type: "delete", key },
    }),
  );
}
