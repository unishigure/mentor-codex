"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import EditModal from "./edit-modal";
import { CheckIcon, DeleteIcon, EditIcon, EnterIcon, StopIcon } from "./icons";
import ProgressCount from "./progress-count";

import { Content, ContentList, Expansion, Job, Tale } from "@/types";
import { db } from "@/config/db";

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
  {
    key: "actions",
    label: "操作",
    align: "center",
  },
];

const renderContentName = (content: Content | undefined) => {
  const expansion = Object.entries(Expansion).map(([_key, value]) => {
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
        <Chip className="mr-2" radius="sm" size="sm">
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
    <Chip color={color} radius="sm" size="sm" variant="flat">
      {jobName}
    </Chip>
  );
};

const renderInProgress = (tale: Tale) => {
  if (tale.inProgress) {
    return (
      <Chip
        color="primary"
        startContent={<EnterIcon size={18} />}
        variant="faded"
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
        color="success"
        startContent={<CheckIcon size={18} />}
        variant="faded"
      >
        成功
      </Chip>
    );
  } else {
    return (
      <Chip
        color="warning"
        startContent={<StopIcon size={18} />}
        variant="faded"
      >
        失敗
      </Chip>
    );
  }
};

export default function ContentTable() {
  const [tails, setTails] = useState<Tale[]>([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTale, setSelectedTale] = useState<Tale | null>(null);

  const liveTails = useLiveQuery(() => db.tales.toArray());

  const rowsPerPage = 10;
  const pages = Math.ceil(tails.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tails.slice(start, end);
  }, [page, tails]);

  useEffect(() => {
    if (liveTails) {
      setIsLoading(false);
      const counted: Tale[] = [];

      liveTails
        .toSorted((a, b) => (a.dateTime > b.dateTime ? 1 : -1))
        .forEach((value, index) => {
          counted.push({ ...value, key: index + 1 });
        });
      setTails(counted.toReversed());
    }
  }, [liveTails]);

  const renderActions = (tale: Tale) => {
    return (
      <div className="relative flex justify-center gap-1">
        <Tooltip content="編集">
          <Button
            isIconOnly
            aria-label="edit"
            color="default"
            id={tale.id}
            isLoading={isProcessing}
            size="sm"
            variant="faded"
            onClick={(event) => {
              editTale(event);
            }}
          >
            <EditIcon className="pointer-events-none" size={16} />
          </Button>
        </Tooltip>
        <Tooltip content="削除">
          <Button
            isIconOnly
            aria-label="delete"
            color="danger"
            id={tale.id}
            isLoading={isProcessing}
            size="sm"
            variant="faded"
            onClick={(event) => {
              deleteTale(event);
            }}
          >
            <DeleteIcon className="pointer-events-none" size={16} />
          </Button>
        </Tooltip>
      </div>
    );
  };

  const editTale = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    const target = event.target as HTMLButtonElement;
    const selected = tails.find((tale) => tale.id === target.id);

    if (!selected) return;

    setSelectedTale(selected);
    onOpen();
  };

  const deleteTale = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    setIsProcessing(true);
    const target = event.target as HTMLButtonElement;

    db.tales.delete(target.id).finally(() => {
      setIsProcessing(false);
    });
  };

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
          emptyContent={"あなただけの記録はここから始まります"}
          isLoading={isLoading}
          items={items}
          loadingContent={<Spinner />}
        >
          {(item) => {
            const content = ContentList.find((v) => v.id === item.contentId);

            return (
              <TableRow key={item.id}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{renderContentName(content)}</TableCell>
                <TableCell>{content?.category}</TableCell>
                <TableCell>{renderJob(item)}</TableCell>
                <TableCell>{item.dateTime.toLocaleString()}</TableCell>
                <TableCell>{renderInProgress(item)}</TableCell>
                <TableCell>{renderResult(item)}</TableCell>
                <TableCell>{renderActions(item)}</TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      <EditModal
        isOpen={isOpen}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        tale={selectedTale}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
