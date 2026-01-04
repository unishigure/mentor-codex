import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "ja";

  const jaMessages = (await import("../../../../messages/ja.json")).default;
  const localeMessages = (await import(`../../../../messages/${locale}.json`))
    .default;

  // Fall back to Japanese messages for any missing translations
  const messages = { ...jaMessages, ...localeMessages };

  return { locale, messages };
});
