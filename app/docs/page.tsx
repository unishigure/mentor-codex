"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import ClearModal from "@/components/clear-modal";
import ExportButton from "@/components/export-button";
import ImportForm from "@/components/import-form";
import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <>
      <h1 className={title()}>Usage</h1>
      <div className="m-8">
        <p>
          取扱説明書の製作中...
        </p>
      </div>
      <Accordion variant="shadow" className="my-4">
        <AccordionItem key="import/export" title="Data Import / Export">
          <div className="relative flex flex-col gap-2 py-4">
            <ImportForm />
            <ExportButton />
          </div>
        </AccordionItem>
        <AccordionItem key="clear" title="Clear data">
          <div className="flex flex-col">
            <ClearModal />
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
