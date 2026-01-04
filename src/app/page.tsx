import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { getJobI18nKey } from "@/app/lib/job";
import { SelectLocale } from "@/components/select-locale";

const latestVersion = "v7.4";

export default async function HomePage() {
  const t = await getTranslations();

  const store = await cookies();
  const currentLocale = store.get("locale")?.value ?? "ja";
  const jobI18nKey = await getJobI18nKey(store.get("job")?.value || "");

  return (
    <main>
      <div className="flex flex-col items-center justify-center p-24">
        <h1 className="font-bold text-3xl">{t("title")}</h1>
        <div className="mt-4 flex flex-col items-center gap-4">
          <div>{t("description")}</div>
          <SelectLocale currentLocale={currentLocale} />
          <div>
            {latestVersion} {t(`Expansion.${latestVersion}`)}
          </div>
          {jobI18nKey && <div>{t(jobI18nKey)}</div>}
        </div>
      </div>
    </main>
  );
}
