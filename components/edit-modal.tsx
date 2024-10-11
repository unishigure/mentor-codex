"use client";

import { FormEvent } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { db } from "@/config/db";
import { ContentList, Job, JobType, Tale } from "@/types";

interface EditModalProps {
  tale: Tale | null;
  isOpen: boolean;
  onOpenChange: () => void;
  isProcessing: boolean;
  setIsProcessing: (isLoading: boolean) => void;
}

export default function EditModal({
  tale,
  isOpen,
  onOpenChange,
  isProcessing: isLoading,
  setIsProcessing: setIsLoading,
}: Readonly<EditModalProps>) {
  const contentName =
    ContentList.find((c) => c.id === tale?.contentId)?.name ?? "missing";

  const submitEdit = async (event: FormEvent) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLFormElement;
    const formData = new FormData(eventTarget);

    const job = formData.get("job")!.toString() as JobType;
    const inProgress = !!formData.get("inProgress");
    const result = !!formData.get("result");

    setIsLoading(true);
    await db.tales
      .update(tale!.id, {
        job,
        inProgress,
        result,
      })
      .finally(() => {
        setIsLoading(false);
        onOpenChange();
      });
  };

  const jobOptionRender = (selected: string) => {
    return (
      <Autocomplete
        isRequired
        defaultInputValue={selected}
        label="ジョブ"
        name="job"
        validationBehavior="native"
      >
        <AutocompleteSection showDivider title="Tank">
          {Object.values(Job.Tank).map((job) => (
            <AutocompleteItem key={job} value={job}>
              {job}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection showDivider title="Healer">
          {Object.values(Job.Healer).map((job) => (
            <AutocompleteItem key={job} value={job}>
              {job}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection showDivider title="Melee DPS">
          {Object.values(Job.Melee).map((job) => (
            <AutocompleteItem key={job} value={job}>
              {job}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection showDivider title="Physical Ranged DPS">
          {Object.values(Job.PhysicalRange).map((job) => (
            <AutocompleteItem key={job} value={job}>
              {job}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection title="Magical Ranged DPS">
          {Object.values(Job.MagicalRange).map((job) => (
            <AutocompleteItem key={job} value={job}>
              {job}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      </Autocomplete>
    );
  };

  const checkboxRender = (inProgress: boolean, result: boolean) => {
    return (
      <div className="flex gap-4 justify-end">
        <Checkbox defaultSelected={inProgress} name="inProgress" value="true">
          途中参加
        </Checkbox>
        <Checkbox defaultSelected={result} name="result" value="true">
          コンテンツクリア
        </Checkbox>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={submitEdit}>
          <ModalHeader className="flex flex-col gap-1">記録の編集</ModalHeader>
          <ModalBody>
            <Autocomplete
              isDisabled
              defaultSelectedKey="content-key"
              label="コンテンツ"
              name="content"
            >
              <AutocompleteItem key="content-key" value={contentName}>
                {contentName}
              </AutocompleteItem>
            </Autocomplete>
            {jobOptionRender(tale?.job ?? "ナイト")}
            {checkboxRender(tale?.inProgress ?? false, tale?.result ?? false)}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="reset" variant="light">
              クリア
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              編集
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
