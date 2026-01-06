import { Content } from "@/lib/i18n/messages/jp.json";

export { Content };

export type DungeonCode = keyof typeof Content.Dungeons;
export type GuildhestCode = keyof typeof Content.Guildhests;
export type TrialCode = keyof typeof Content.Trials;
export type ExtremeCode = keyof typeof Content.Extremes;
export type RaidCode = keyof typeof Content.Raids;
export type AllianceCode = keyof typeof Content.AllianceRaids;

export type Category = keyof typeof Content;
export type ContentCode =
  | DungeonCode
  | GuildhestCode
  | TrialCode
  | ExtremeCode
  | RaidCode
  | AllianceCode;

export function getContentI18nKey(code: string): string | null {
  for (const [category, contents] of Object.entries(Content)) {
    if (typeof contents === "object" && code in contents) {
      return `Content.${category}.${code}`;
    }
  }
  return null;
}

export function getContentDutyId(code: string): string | null {
  for (const contents of Object.values(Content)) {
    if (
      typeof contents !== "object" ||
      contents === null ||
      !(code in contents)
    ) {
      continue;
    }

    const entry = (contents as Record<string, { dutyId?: string }>)[code];
    if (entry?.dutyId) return entry.dutyId;
  }

  return null;
}
