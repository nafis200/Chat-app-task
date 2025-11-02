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
  interviews: [
    { session_id: "uuid-2023-1", date: "2023-01-10T10:00:00Z", interview_type: "behavioral", score: 60 },
    { session_id: "uuid-2023-2", date: "2023-04-15T12:00:00Z", interview_type: "technical", score: 65 },
    { session_id: "uuid-2023-3", date: "2023-09-20T14:00:00Z", interview_type: "system-design", score: 70 },
    { session_id: "uuid-2024-1", date: "2024-02-05T10:00:00Z", interview_type: "behavioral", score: 68 },
    { session_id: "uuid-2024-2", date: "2024-06-18T11:00:00Z", interview_type: "AI", score: 72 },
    { session_id: "uuid-2024-3", date: "2024-10-12T12:00:00Z", interview_type: "system-design", score: 75 },
  ],
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
  recentInterviews?: { session_id: string; interview_type: string; score: number }[];
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
      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {value}%
    </span>
  );
}

// TinyCircular chart for improvement
function TinySpark({ percent }: { percent: number }) {
  return (
    <div className="w-20 h-20 md:ml-5">
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

// Colored badge for interview type
function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    behavioral: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    technical: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    "system-design": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-400",
  };
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[type] || colors.default}`}>{type}</span>;
}

export default function StatsCard() {
  const { summary, interviews } = data;

  const improvementValue = summary.latest_score - summary.first_score;
  const improvementPercent = parseFloat(((improvementValue / summary.first_score) * 100).toFixed(1));
  const isImproved = improvementPercent >= 0;

  // Get last 3 interviews
  const lastInterviews = [...interviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const stats: Stat[] = [
    {
      title: "Total Time Spent",
      value: `${summary.total_time_spent_hours} hrs`,
      label: "Hours Spent on Interviews",
      badge: "Info",
      badgeColor: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
    },
    {
      title: "Total Interviews",
      value: summary.total_interviews,
      label: "Number of Interviews Taken",
      badge: "Active",
      badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
      recentInterviews: lastInterviews,
    },
    {
      title: "Best Score",
      value: `${summary.best_score} / 100`,
      label: "Highest Score Achieved",
      badge: "Top Score",
      badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    },
    {
      title: "Improvement",
      value: improvementValue,
      label: "Score Improvement",
      change: improvementPercent,
      changeUp: isImproved,
      tinyChart: true,
      badge: isImproved ? "Improved" : "Declined",
      badgeColor: isImproved
        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
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
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-slate-500 dark:text-slate-300 font-medium">{s.title}</div>
                    {s.badge && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.badgeColor}`}>
                        {s.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-col gap-2">
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white">{s.value}</div>

                    {s.recentInterviews && (
                      <div className="flex flex-col gap-1">
                        {s.recentInterviews.map((i) => (
                          <div key={i.session_id} className="flex items-center gap-2">
                            <TypeBadge type={i.interview_type} />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{i.score}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {s.change && <ChangePill value={s.change} up={s.changeUp} />}
                  </div>
                </div>

                {s.tinyChart && <TinySpark percent={improvementPercent} />}
              </div>

              <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
