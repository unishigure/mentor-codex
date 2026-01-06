import { ProgressAstrope } from "@/components/progress-astrope";
import { TaleList } from "@/components/tale-list";
import { TaleListSm } from "@/components/tale-list-sm";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-6">
      <ProgressAstrope />
      <div className="flex-1 lg:hidden">
        <TaleListSm />
      </div>
      <div className="hidden flex-1 lg:block">
        <TaleList />
      </div>
    </main>
  );
}
