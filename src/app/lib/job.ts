import { Job } from "@/app/lib/i18n/messages/ja.json";

/**
 * Get the i18n key for a given job value.
 *
 * @param value The job value to look up. ex.) "PLD", "WAR"
 * @returns The i18n key string if found, otherwise null.
 */
export async function getJobI18nKey(value: string): Promise<string | null> {
  for (const [categoryKey, category] of Object.entries(Job)) {
    if (typeof category === "object" && value in category) {
      return `Job.${categoryKey}.${value}`;
    }
  }
  return null;
}
