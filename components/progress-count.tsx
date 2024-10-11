"use client";

import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";

import { Tale } from "@/types";

interface ProgressCountProps {
  tales: Tale[];
}

const MountGoal = 2000;

export default function ProgressCount({ tales }: Readonly<ProgressCountProps>) {
  const [progressCount, setProgressCount] = useState(0);
  const [progPercent, setProgPercent] = useState(0);
  const [color, setColor] = useState<
    "success" | "default" | "primary" | "secondary" | "warning" | "danger"
  >("default");

  useEffect(() => {
    const progressCount = tales.filter((t) => t.result).length;
    const progPercent = (progressCount / MountGoal) * 100;

    setProgressCount(progressCount);
    setProgPercent(progPercent);

    if (progPercent >= 2.5 && progPercent < 10) {
      setColor("primary");
    } else if (progPercent >= 10 && progPercent < 25) {
      setColor("secondary");
    } else if (progPercent >= 25 && progPercent < 50) {
      setColor("warning");
    } else if (progPercent >= 50 && progPercent < 100) {
      setColor("danger");
    } else if (progPercent === 100) {
      setColor("success");
    }
  }, [tales]);

  return (
    <Progress
      color={color}
      label={`Road to Astrope: ${progressCount} / ${MountGoal}`}
      size="sm"
      value={progPercent}
    />
  );
}
