import Dexie, { Table } from "dexie";

import { Tale } from "@/types";

class TalesDatabase extends Dexie {
  tales: Table<Tale, string>;

  constructor() {
    super("TalesDatabase");
    this.version(1).stores({
      tales: "++id, dateTime, contentId, job, inProgress, result",
    });
    this.tales = this.table("tales");
  }
}

export const db = new TalesDatabase();
