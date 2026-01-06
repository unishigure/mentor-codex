import type { Tale } from "@/lib/db";
import { Roulette } from "@/lib/i18n/messages/jp.json";

export { Roulette };

export type RouletteCode = keyof typeof Roulette;

export function getRouletteI18nKey(code: string): string | null {
  if (code in Roulette) {
    return `Roulette.${code}`;
  }
  return null;
}

export function countMentorRoulette(tales: Tale[]): number {
  return tales
    .filter((tale) => tale.roulette === "mentor" && tale.result)
    .length;
}
