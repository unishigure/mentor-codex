import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold text-3xl">{t("title")}</h1>
      <div>{t("description")}</div>
    </main>
  );
}
