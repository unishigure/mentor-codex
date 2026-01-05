import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import * as jpMessages from "@/lib/i18n/messages/jp.json";
import { Content as jpContent } from "@/lib/i18n/messages/jp.json";
import { LOCALES } from "@/lib/locale";

type Content = (typeof jpContent)["Dungeons"]["dungeon_15"];

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "jp";

  if (!LOCALES.includes(locale)) {
    throw new Error("Unsupported locale");
  }

  const localeMessages = (await import(`./messages/${locale}.json`)).default;
  const localeContent = localeMessages.Content || {};

  // Use locale names but preserve jp details (level, expansion)
  const mergedContent: Record<string, Record<string, Content>> = {};
  Object.entries(jpContent).forEach(([section, items]) => {
    mergedContent[section] = {};
    Object.entries(items).forEach(([id, jpItem]) => {
      const localeItem = localeContent[section]?.[id] || {};
      mergedContent[section][id] = {
        ...jpItem,
        name: localeItem.name || jpItem.name,
      };
    });
  });

  // Fall back to Japanese messages for any missing translations
  const messages = { ...jpMessages, ...localeMessages };
  messages.Content = mergedContent;

  return { locale, messages };
});
