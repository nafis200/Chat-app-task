"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type Stat = {
  title: string;
  value: string;
  label: string;
  change: number;
  changeUp?: boolean;
  tinyChart?: boolean;
};

const stats: Stat[] = [
  { title: "Guide Views", value: "1.240", label: "Views (7 Days)", change: 23, changeUp: true },
  { title: "Checklists", value: "680", label: "Guide Trigger (7 Days)", change: 36, changeUp: false },
  { title: "Hotspots", value: "920", label: "Interactions (7 Days)", change: 45, changeUp: true },
  { title: "Most Active Users", value: "1.565", label: "(Last 5 Year)", change: 45, changeUp: true, tinyChart: true },
];

function ChangePill({ value, up }: { value: number; up?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md ${
        up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {value}
    </span>
  );
}

function TinySpark({ active = 3 }: { active?: number }) {
  // simple 5-rect sparkline like the screenshot
  const bars = [2, 3, 4, 5, 3];
  return (
    <div className="ml-3 flex items-center space-x-1 opacity-80">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`w-[6px] rounded-sm ${i === active ? "bg-blue-600" : "bg-slate-200"}`}
          style={{ height: `${h * 6}px` }}
        />
      ))}
    </div>
  );
}

export default function ShadcnStatsCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex gap-6">
          {stats.map((s, idx) => (
            <div key={s.title} className={`flex-1 ${idx < stats.length - 1 ? "border-r border-slate-100 pr-6" : "pl-6"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-slate-500 font-medium">{s.title}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-semibold text-slate-900">{s.value}</div>
                    <ChangePill value={s.change} up={s.changeUp} />
                    {s.tinyChart ? <TinySpark active={3} /> : null}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
