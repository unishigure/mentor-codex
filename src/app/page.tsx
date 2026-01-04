import { getTranslations } from "next-intl/server";

import { SelectLocale } from "@/components/select-locale";
import { TaleList } from "@/components/tale-list";
import { WriteTale } from "@/components/write-tale";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <main>
      <header className="flex items-center justify-between border-gray-200 border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <h1 className="font-bold text-2xl">{t("title")}</h1>
        <SelectLocale />
      </header>
      <TaleList />
      <div className="fixed right-4 bottom-4">
        <WriteTale />
      </div>
    </main>
  );
}
