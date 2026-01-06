import { Job } from "@/lib/i18n/messages/jp.json";

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

const roleColorByRole: Record<Role, string> = {
  Tank: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200",
  Healer:
    "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-200",
  Melee: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200",
  PhysicalRanged:
    "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200",
  MagicalRanged: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-200",
};

export function getRoleColorByJobCode(code: JobCode): string {
  for (const [role, jobs] of Object.entries(Job)) {
    if (typeof jobs === "object" && code in jobs) {
      return roleColorByRole[role as Role];
    }
  }
  return "bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-white";
}
