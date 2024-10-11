"use client";

import { FormEvent, useState } from "react";
import { v7 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { ContentList, Tale } from "@/types";
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

  const router = useRouter();

  const registerJson = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const eventTarget = event.target as HTMLFormElement;
    const formData = new FormData(eventTarget);

    try {
      const json = formData.get("json")!.toString();
      const data = JSON.parse(json) as Array<any>;
      const tales = data.map(
        (tale) =>
          ({
            id: uuid(),
            dateTime: tale.dateTime ? new Date(tale.dateTime) : new Date(),
            contentId: ContentList.find((c) => c.name === tale.content)?.id,
            job: tale.job,
            inProgress: tale.inProgress,
            result: tale.result,
          }) as Tale,
      );

      await db.tales.bulkAdd(tales);

      router.push("/");
    } catch (e) {
      setIsInvalid(true);
    }

    const form = document.getElementById("import-form") as HTMLFormElement;

    form.reset();

    setIsLoading(false);
  };

  return (
    <div className="py-2">
      <form id="import-form" onSubmit={registerJson}>
        <Textarea
          errorMessage="Invalid JSON format"
          isInvalid={isInvalid}
          label="Import JSON"
          labelPlacement="outside"
          minRows={10}
          name="json"
          placeholder={placeholder}
          size="lg"
          onChange={() => setIsInvalid(false)}
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
