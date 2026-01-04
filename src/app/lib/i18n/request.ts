import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import * as jaMessages from "@/app/lib/i18n/messages/ja.json";
import { Content as jaContent } from "@/app/lib/i18n/messages/ja.json";

type Content = (typeof jaContent)["Dungeons"]["dungeon_15"];

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "ja";

  const localeMessages = (await import(`./messages/${locale}.json`)).default;
  const localeContent = localeMessages.Content || {};

  // Use locale names but preserve ja details (level, expansion)
  const mergedContent: Record<string, Record<string, Content>> = {};
  Object.entries(jaContent).forEach(([section, items]) => {
    mergedContent[section] = {};
    Object.entries(items).forEach(([id, jaItem]) => {
      const localeItem = localeContent[section]?.[id] || {};
      mergedContent[section][id] = {
        ...jaItem,
        name: localeItem.name || jaItem.name,
      };
    });
  });

  // Fall back to Japanese messages for any missing translations
  const messages = { ...jaMessages, ...localeMessages };
  messages.Content = mergedContent;

  return { locale, messages };
});
