import ExportButton from "@/components/export-button";
import ImportForm from "@/components/import-form";
import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Usage</h1>
      <ImportForm />
      <ExportButton />
    </div>
  );
}
