import ClearModal from "@/components/clear-modal";
import ExportButton from "@/components/export-button";
import ImportForm from "@/components/import-form";
import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Usage</h1>
      <ImportForm />
      <div className="relative flex flex-col justify-center gap-2">
        <ExportButton />
        <ClearModal />
      </div>
    </div>
  );
}
