import ContentTable from "@/components/content-table";
import CreateModal from "@/components/create-modal";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ContentTable />
      <CreateModal />
    </section>
  );
}
