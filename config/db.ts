import Dexie, { type EntityTable } from "dexie";

import { Tale } from "@/types";

const db = new Dexie("TalesDatabase") as Dexie & {
  tales: EntityTable<Tale>;
};

db.version(1).stores({
  tales: "++id, dateTime, contentId, job, inProgress, result",
});

export type { Tale };
export { db };
