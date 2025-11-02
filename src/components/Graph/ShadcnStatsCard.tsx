"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Stat = {
  title: string;
  value: string;
  label: string;
  change: number;
  changeUp?: boolean;
  tinyChart?: boolean;
};

const stats: Stat[] = [
  {
    title: "Guide Views",
    value: "1,240",
    label: "Views (7 Days)",
    change: 23,
    changeUp: true,
  },
  {
    title: "Checklists",
    value: "680",
    label: "Guide Trigger (7 Days)",
    change: 36,
    changeUp: false,
  },
  {
    title: "Hotspots",
    value: "920",
    label: "Interactions (7 Days)",
    change: 45,
    changeUp: true,
  },
  {
    title: "Most Active Users",
    value: "1,565",
    label: "(Last 5 Years)",
    change: 45,
    changeUp: true,
    tinyChart: true,
  },
];

function ChangePill({ value, up }: { value: number; up?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md ${
        up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {up ? (
        <ArrowUpRight className="w-3 h-3" />
      ) : (
        <ArrowDownRight className="w-3 h-3" />
      )}
      {value}%
    </span>
  );
}

function TinySpark() {
  return (
    <div className="w-16 h-16 md:ml-5">
      <CircularProgressbar
        value={80}
        text="+20%"
        styles={buildStyles({
          textSize: "20px",
          pathColor: "#10b981", // green-500
          textColor: "#10b981",
          trailColor: "#e5e7eb", // gray-200
        })}
      />
    </div>
  );
}

export default function ShadcnStatsCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-6">
          {stats.map((s, idx) => (
            <div
              key={s.title}
              className={`flex-1 min-w-[200px] ${
                idx < stats.length - 1 ? "border-r border-slate-200 pr-6" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-slate-500 font-medium">
                    {s.title}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-semibold text-slate-900">
                      {s.value}
                    </div>
                    <ChangePill value={s.change} up={s.changeUp} />
                  </div>
                </div>
                {s.tinyChart && <TinySpark />}
              </div>
              <div className="mt-3 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
