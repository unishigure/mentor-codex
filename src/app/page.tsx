import { TaleList } from "@/components/tale-list";
import { TaleListSm } from "@/components/tale-list-sm";
import { WriteTale } from "@/components/write-tale";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="flex-1 xl:hidden">
        <TaleListSm />
      </div>
      <div className="hidden flex-1 xl:block">
        <TaleList />
      </div>
      <div className="fixed right-4 bottom-4">
        <WriteTale />
      </div>
    </main>
  );
}
