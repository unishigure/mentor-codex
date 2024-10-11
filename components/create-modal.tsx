"use client";

import { FormEvent, useState } from "react";
import { v7 as uuid } from "uuid";
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
  useDisclosure,
} from "@nextui-org/modal";

import { PlusIcon } from "@/components/icons";
import { db } from "@/config/db";
import { ContentCategory, ContentList, Job, JobType } from "@/types";

export default function CreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const submitCreate = async (event: FormEvent) => {
    event.preventDefault();
    const eventTarget = event.target as HTMLFormElement;
    const formData = new FormData(eventTarget);

    const contentName = formData.get("content");
    const job = formData.get("job")!.toString() as JobType;
    const dateTime = new Date();
    const inProgress = !!formData.get("inProgress");
    const result = !!formData.get("result");

    const content = ContentList.find((c) => c.name === contentName);

    setIsLoading(true);
    await db.tales
      .add({
        id: uuid(),
        key: undefined,
        dateTime,
        contentId: content!.id,
        job,
        inProgress,
        result,
      })
      .finally(() => {
        setIsLoading(false);
        onOpenChange();
      });
  };

  const contentOptionRender = () => {
    return (
      <Autocomplete
        isRequired
        label="コンテンツ"
        name="content"
        validationBehavior="native"
      >
        {Object.entries(ContentCategory).map(([_key, value]) => (
          <AutocompleteSection key={value} showDivider title={value}>
            {ContentList.filter((c) => c.category === value).map((c) => (
              <AutocompleteItem key={c.id} value={c.id}>
                {c.name}
              </AutocompleteItem>
            ))}
          </AutocompleteSection>
        ))}
      </Autocomplete>
    );
  };

  const jobOptionRender = () => {
    return (
      <Autocomplete
        isRequired
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

  const checkboxRender = () => {
    return (
      <div className="flex gap-4 justify-end">
        <Checkbox name="inProgress" value="true">
          途中参加
        </Checkbox>
        <Checkbox defaultSelected name="result" value="true">
          コンテンツクリア
        </Checkbox>
      </div>
    );
  };

  return (
    <>
      <Button onPress={onOpen}>
        <PlusIcon size={18} />
        記録する
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form onSubmit={submitCreate}>
              <ModalHeader className="flex flex-col gap-1">
                記録の追加
              </ModalHeader>
              <ModalBody>
                {contentOptionRender()}
                {jobOptionRender()}
                {checkboxRender()}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" type="reset" variant="light">
                  クリア
                </Button>
                <Button color="primary" isLoading={isLoading} type="submit">
                  追加
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
