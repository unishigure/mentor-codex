"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { db } from "@/config/db";

export default function ClearModal() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clearData = async () => {
    db.delete({ disableAutoOpen: false });
    router.push("/");
  };

  return (
    <>
      <Button onClick={onOpen} color="danger" size="sm" variant="flat">
        CLEAR CODEX
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>記録の全削除</ModalHeader>
          <ModalBody>
            <p>全ての記録が削除されます。よろしいですか？</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onOpenChange}
              color="default"
              size="sm"
              variant="flat"
            >
              キャンセル
            </Button>
            <Button onClick={clearData} color="danger" size="sm" variant="flat">
              削除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
