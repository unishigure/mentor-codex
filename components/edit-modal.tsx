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
      .then(() => {
        return "edited";
      })
      .catch((e) => {
        console.error(e);
        return null;
      })
      .finally(() => {
        setIsLoading(false);
        onOpenChange();
      });
  };

  const jobOptionRender = (selected: string) => {
    return (
      <Autocomplete
        name="job"
        label="ジョブ"
        isRequired
        validationBehavior="native"
        defaultInputValue={selected}
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
        <Checkbox name="inProgress" value="true" defaultSelected={inProgress}>
          途中参加
        </Checkbox>
        <Checkbox name="result" value="true" defaultSelected={result}>
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
              name="content"
              label="コンテンツ"
              isDisabled
              defaultSelectedKey="content-key"
            >
              <AutocompleteItem key="content-key" value={contentName}>
                {contentName}
              </AutocompleteItem>
            </Autocomplete>
            {jobOptionRender(tale?.job ?? "ナイト")}
            {checkboxRender(tale?.inProgress ?? false, tale?.result ?? false)}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" type="reset">
              クリア
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              編集
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
