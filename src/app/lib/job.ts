import { Job } from "@/app/lib/i18n/messages/ja.json";

export { Job };

export type TankJobCode = keyof typeof Job.Tank;
export type HealerJobCode = keyof typeof Job.Healer;
export type MeleeDPSJobCode = keyof typeof Job.Melee;
export type RangedDPSJobCode = keyof typeof Job.PhysicalRanged;
export type CasterDPSJobCode = keyof typeof Job.MagicalRanged;

export type Role = keyof typeof Job;
export type JobCode =
  | TankJobCode
  | HealerJobCode
  | MeleeDPSJobCode
  | RangedDPSJobCode
  | CasterDPSJobCode;

/**
 * Get the i18n key for a given job value.
 *
 * @param code The job value to look up. ex.) "PLD", "WAR"
 * @returns The i18n key string if found, otherwise null.
 */
export function getJobI18nKey(code: string): string | null {
  for (const [role, jobs] of Object.entries(Job)) {
    if (typeof jobs === "object" && code in jobs) {
      return `Job.${role}.${code}`;
    }
  }
  return null;
}
