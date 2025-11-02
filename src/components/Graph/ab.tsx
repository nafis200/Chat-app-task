"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data = {
  summary: {
    total_interviews: 18,
    total_time_spent_hours: 42,
    latest_score: 60,
    average_score: 78.5,
    best_score: 92,
    first_score: 50,
  },
};

type Stat = {
  title: string;
  value: string | number;
  label: string;
  change?: number;
  changeUp?: boolean;
  tinyChart?: boolean;
  badge?: string;
  badgeColor?: string;
};

function ChangePill({ value, up }: { value: number; up?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md ${
        up
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
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

function TinySpark({ percent }: { percent: number }) {
  return (
    <div className="w-16 h-16 md:ml-5">
      <CircularProgressbar
        value={percent}
        text={`${percent.toFixed(0)}%`}
        styles={buildStyles({
          textSize: "20px",
          pathColor: "#6366f1",
          textColor: "#6366f1",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
}

export default function StatsCard() {
  const { summary } = data;

  const improvementValue = summary.latest_score - summary.first_score;
  const isImproved = improvementValue >= 0;
  const improvementPercent: number = parseFloat(
    ((improvementValue / summary.first_score) * 100).toFixed(1)
  );

  const stats: Stat[] = [
    {
      title: "Total Time Spent",
      value: `${summary.total_time_spent_hours} hrs`,
      label: "Hours Spent on Interviews",
      change: 23,
      changeUp: true,
      badge: "Info",
      badgeColor:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
    },
    {
      title: "Total Interviews",
      value: summary.total_interviews,
      label: "Number of Interviews Taken",
      change: 23,
      changeUp: true,
      badge: "Active",
      badgeColor:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    },
    {
      title: "Best Score",
      value: summary.best_score,
      label: "Highest Score Achieved",
      change: 23,
      changeUp: true,
      badge: "Top Score",
      badgeColor:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    },
    {
      title: "Improvement",
      value: improvementValue,
      label: "Score Improvement",
      change: improvementPercent,
      changeUp: isImproved,
      tinyChart: true,
      badge: "Improved",
      badgeColor:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-slate-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.title}
              className="flex flex-col justify-between border border-slate-100 dark:border-neutral-800 rounded-xl p-4 hover:shadow-md dark:hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-slate-500 dark:text-slate-300 font-medium">
                      {s.title}
                    </div>
                    {s.badge && (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.badgeColor}`}
                      >
                        {s.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {s.value}
                    </div>
                    {s.change && (
                      <ChangePill value={s.change} up={s.changeUp} />
                    )}
                  </div>
                </div>
                {s.tinyChart && <TinySpark percent={improvementPercent} />}
              </div>

              <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
