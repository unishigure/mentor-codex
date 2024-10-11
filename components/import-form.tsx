"use client";

import { FormEvent, useState } from "react";
import { v7 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { ContentList, Tale, Job } from "@/types";
import { db } from "@/config/db";

const placeholder = `[
    {
        "content": "幻龍残骸 黙約の塔",
        "job": "竜騎士",
        "dateTime": "2022/01/30 20:00",
        "inProgress": false,
        "result": true
    }
]`;

export default function ImportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const registerJson = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const eventTarget = event.target as HTMLFormElement;
    const formData = new FormData(eventTarget);

    try {
      const json = formData.get("json")!.toString();
      const data = JSON.parse(json) as Array<any>;

      // validate content name
      const isValid = data.every((tale) =>
        ContentList.some((c) => c.name === tale.content)
      );
      if (!isValid) {
        throw new Error("Invalid content name");
      }

      // validate job name
      const isValidJob = data.every(
        (tale) =>
          Object.values(Job.Tank).some((j) => j === tale.job) ||
          Object.values(Job.Healer).some((j) => j === tale.job) ||
          Object.values(Job.Melee).some((j) => j === tale.job) ||
          Object.values(Job.PhysicalRange).some((j) => j === tale.job) ||
          Object.values(Job.MagicalRange).some((j) => j === tale.job)
      );
      if (!isValidJob) {
        throw new Error("Invalid job name");
      }

      // validate boolean
      const isValidInProgress = data.every(
        (tale) => typeof tale.inProgress === "boolean"
      );
      const isValidResult = data.every(
        (tale) => typeof tale.result === "boolean"
      );
      if (!isValidInProgress) {
        throw new Error("Invalid inProgress value");
      }
      if (!isValidResult) {
        throw new Error("Invalid result value");
      }

      const tales = data.map(
        (tale) =>
          ({
            id: uuid(),
            dateTime: tale.dateTime ? new Date(tale.dateTime) : new Date(),
            contentId: ContentList.find((c) => c.name === tale.content)?.id,
            job: tale.job,
            inProgress: tale.inProgress,
            result: tale.result,
          }) as Tale
      );

      await db.tales.bulkAdd(tales);

      router.push("/");
    } catch (e) {
      setIsInvalid(true);

      if (e instanceof SyntaxError) {
        setErrorMessage("Invalid JSON format");
      } else if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        console.error(e);
        setErrorMessage("Unknown error");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="py-2">
      <form id="import-form" onSubmit={registerJson}>
        <Textarea
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          label="Import JSON"
          labelPlacement="outside"
          minRows={10}
          name="json"
          placeholder={placeholder}
          size="lg"
          onChange={() => {
            setIsInvalid(false);
          }}
        />
        <div className="flex flex-row gap-2 px-6 py-4 justify-center">
          <Button color="danger" type="reset" variant="light">
            クリア
          </Button>
          <Button color="primary" isLoading={isLoading} type="submit">
            追加
          </Button>
        </div>
      </form>
    </div>
  );
}
