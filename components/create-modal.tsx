"use client";

import { FormEvent, useState } from "react";
import { v7 as uuid } from "uuid";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { Checkbox } from "@nextui-org/checkbox";

import { PlusIcon } from "@/components/icons";
import { ContentCategory, ContentList, Job, JobType } from "@/types";
import { db } from "@/config/db";

export default function CreateModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const submitRecord = async (event: FormEvent) => {
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
        dateTime,
        contentId: content!.id,
        job,
        inProgress,
        result,
      })
      .then(() => {
        return "created";
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

  return (
    <>
      <Button onPress={onOpen}>
        <PlusIcon size={18} />
        記録する
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form onSubmit={submitRecord}>
              <ModalHeader className="flex flex-col gap-1">
                記録の追加
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  name="content"
                  label="コンテンツ"
                  isRequired
                  validationBehavior="native"
                >
                  {Object.entries(ContentCategory).map(([key, value]) => (
                    <AutocompleteSection showDivider title={value} key={value}>
                      {ContentList.filter((c) => c.category === value).map(
                        (c) => (
                          <AutocompleteItem key={c.id} value={c.id}>
                            {c.name}
                          </AutocompleteItem>
                        )
                      )}
                    </AutocompleteSection>
                  ))}
                </Autocomplete>
                <Autocomplete
                  name="job"
                  label="ジョブ"
                  isRequired
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
                <div className="flex gap-4 justify-end">
                  <Checkbox name="inProgress" value="true">
                    途中参加
                  </Checkbox>
                  <Checkbox name="result" value="true" defaultSelected>
                    コンテンツクリア
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" type="reset">
                  クリア
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
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
