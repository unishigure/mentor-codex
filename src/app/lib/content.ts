import { Content } from "@/app/lib/i18n/messages/ja.json";

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
