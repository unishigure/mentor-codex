import { TaleList } from "@/components/tale-list";
import { TaleListSm } from "@/components/tale-list-sm";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="flex-1 lg:hidden">
        <TaleListSm />
      </div>
      <div className="hidden flex-1 lg:block">
        <TaleList />
      </div>
    </main>
  );
}
