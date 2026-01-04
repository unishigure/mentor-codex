import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { SelectJobCookie } from "@/components/select-job-cookie";
import { SelectLocale } from "@/components/select-locale";

export default async function HomePage() {
  const t = await getTranslations();

  const store = await cookies();
  const currentLocale = store.get("locale")?.value ?? "ja";
  const currentJob = store.get("job")?.value;

  return (
    <main>
      <div className="flex flex-col items-center justify-center p-24">
        <h1 className="font-bold text-3xl">{t("title")}</h1>
        <div className="mt-4 flex flex-col items-center gap-4">
          <SelectLocale currentLocale={currentLocale} />
          <SelectJobCookie initialJob={currentJob} />
        </div>
      </div>
    </main>
  );
}
