"use client";

import { FormEvent, useState } from "react";
import { v7 as uuid } from "uuid";
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
            ...tale,
            id: uuid(),
            contentId: ContentList.find((c) => c.name === tale.content)?.id,
            dateTime: tale.dateTime ? new Date(tale.dateTime) : new Date(),
          }) as Tale
      );
      await db.tales.bulkAdd(tales);
    } catch (e) {
      console.error(e);
      setIsInvalid(true);
    }

    const form = document.getElementById("import-form") as HTMLFormElement;
    form.reset();

    setIsLoading(false);
  };

  return (
    <div className="mt-6 px-6 py-2">
      <form id="import-form" onSubmit={registerJson}>
        <Textarea
          name="json"
          label="JSON Import"
          labelPlacement="outside"
          size="lg"
          minRows={10}
          placeholder={placeholder}
          isInvalid={isInvalid}
          errorMessage="Invalid JSON format"
          onChange={() => setIsInvalid(false)}
        />
        <div className="flex flex-row gap-2 px-6 py-4 justify-end">
          <Button color="primary" type="submit" isLoading={isLoading}>
            追加
          </Button>
        </div>
      </form>
    </div>
  );
}
