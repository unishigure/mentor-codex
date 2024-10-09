"use client";

import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";

import { ContentList, Job, Tale, Expansion, Content } from "@/types";
import { CheckIcon, EnterIcon, StopIcon } from "./icons";
import { db } from "@/config/db";
import ProgressCount from "./progress-count";

const columns: {
  key: string;
  label: string;
  align?: "center" | "start" | "end";
}[] = [
  {
    key: "count",
    label: "No.",
    align: "center",
  },
  {
    key: "content",
    label: "コンテンツ",
  },
  {
    key: "type",
    label: "種別",
  },
  {
    key: "job",
    label: "ジョブ",
    align: "center",
  },
  {
    key: "dateTime",
    label: "記録日時",
  },
  {
    key: "inProgress",
    label: "途中参加",
    align: "center",
  },
  {
    key: "result",
    label: "結果",
    align: "center",
  },
];

const renderContentName = (content: Content | undefined) => {
  const expansion = Object.entries(Expansion).map(([key, value]) => {
    if (Object.values(value).find((v) => v === content?.expansion)) {
      return Object.entries(value).map(([key, value]) => {
        if (value === content?.expansion) {
          // v を取り除き _ を . に置換
          return key.replace(/v/g, "").replace(/_/g, ".");
        }
      });
    }
  });
  return (
    <>
      <Tooltip content={content?.expansion}>
        <Chip className="mr-2" size="sm" radius="sm">
          {expansion}
        </Chip>
      </Tooltip>
      <Link
        isExternal
        showAnchorIcon
        color="foreground"
        href={content?.lodestone}
        size="sm"
      >
        {content?.name}
      </Link>
      <Chip className="ml-2" size="sm">
        Lv.{content?.level}
      </Chip>
    </>
  );
};

const renderJob = (tale: Tale) => {
  const jobName = tale.job;
  let color: "danger" | "primary" | "success" = "danger";
  if (Object.values(Job.Tank).find((v) => v === jobName)) {
    color = "primary";
  }
  if (Object.values(Job.Healer).find((v) => v === jobName)) {
    color = "success";
  }
  return (
    <Chip color={color} size="sm" radius="sm" variant="flat">
      {jobName}
    </Chip>
  );
};

const renderInProgress = (tale: Tale) => {
  if (tale.inProgress) {
    return (
      <Chip
        startContent={<EnterIcon size={18} />}
        variant="faded"
        color="primary"
      >
        途中参加
      </Chip>
    );
  }
};

const renderResult = (tale: Tale) => {
  if (tale.result) {
    return (
      <Chip
        startContent={<CheckIcon size={18} />}
        variant="faded"
        color="success"
      >
        成功
      </Chip>
    );
  } else {
    return (
      <Chip
        startContent={<StopIcon size={18} />}
        variant="faded"
        color="warning"
      >
        失敗
      </Chip>
    );
  }
};

export default function ContentTable() {
  const [tails, setTails] = useState<Tale[]>([]);
  const liveTails = useLiveQuery(() => db.tales.toArray());

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(tails.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tails.slice(start, end);
  }, [page, tails]);

  useEffect(() => {
    if (liveTails) {
      const counted: Tale[] = [];
      liveTails
        .toSorted((a, b) => (a.dateTime > b.dateTime ? 1 : -1))
        .forEach((value, index) => {
          counted.push({ ...value, id: (index + 1).toString() });
        });
      setTails(counted.toReversed());
    }
  }, [liveTails]);

  return (
    <>
      <ProgressCount tales={tails} />
      <Table
        aria-label="Mentor roulette records"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        color="primary"
        selectionMode="single"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align={column.align}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={"あなただけの記録はここから始まります"}
        >
          {(item) => {
            const content = ContentList.find((v) => v.id === item.contentId);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{renderContentName(content)}</TableCell>
                <TableCell>{content?.category}</TableCell>
                <TableCell>{renderJob(item)}</TableCell>
                <TableCell>{item.dateTime.toLocaleString()}</TableCell>
                <TableCell>{renderInProgress(item)}</TableCell>
                <TableCell>{renderResult(item)}</TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}
