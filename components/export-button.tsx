"use client";

import { Button } from "@nextui-org/button";

import { db } from "@/config/db";
import { ContentList } from "@/types";

export default function ExportButton() {
  const exportJson = async () => {
    const tales = await db.tales.toArray();
    const exportTales = tales.map((tale) => {
      const content = ContentList.find((c) => c.id === tale.contentId);
      return {
        content: content?.name,
        job: tale.job,
        dateTime: tale.dateTime.toISOString(),
        inProgress: tale.inProgress,
        result: tale.result,
      };
    });
    const json = JSON.stringify(exportTales, null, 2);

    const date = new Date();
    const pad = (num: number) => num.toString().padStart(2, "0");
    const dateStr = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tales_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return <Button onClick={exportJson}>Json Export</Button>;
}
