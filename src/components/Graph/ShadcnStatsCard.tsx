"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  UserCheck,
  Award,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Card } from "@/components/ui/card";

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
  icon?: React.ReactNode;
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

function getScoreBadge(score: number) {
  if (score <= 40)
    return {
      badge: "Poor",
      color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    };
  if (score <= 50)
    return {
      badge: "Average",
      color:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
    };
  if (score <= 60)
    return {
      badge: "Better",
      color:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    };
  if (score <= 79)
    return {
      badge: "Good",
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    };
  if (score <= 89)
    return {
      badge: "Excellent",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    };
  return {
    badge: "Top Rated",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  };
}

export default function StatsCard() {
  const { summary } = data;

  const improvementValue = summary.latest_score - summary.first_score;
  const improvementPercent: number = parseFloat(
    ((improvementValue / summary.first_score) * 100).toFixed(1)
  );
  const isImproved = improvementPercent >= 0;

  const bestScoreBadge = getScoreBadge(summary.best_score);

  const stats: Stat[] = [
    {
      title: "Total Time Spent",
      value: `${summary.total_time_spent_hours} hrs`,
      label: "Hours Spent on Interviews",
      badge: "Info",
      badgeColor:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
      icon: <Clock className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
    },
    {
      title: "Total Interviews",
      value: summary.total_interviews,
      label: "Number of Interviews Taken",
      badge: "Active",
      badgeColor:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
      icon: (
        <UserCheck className="w-6 h-6 text-green-500 dark:text-green-400" />
      ),
    },
    {
      title: "Best Score",
      value: `${summary.best_score} / 100`,
      label: "Highest Score Achieved",
      badge: bestScoreBadge.badge,
      badgeColor: bestScoreBadge.color,
      icon: <Award className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
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
      icon: null,
    },
  ];

  return (
    <div className="">
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card
              key={s.title}
              className="flex flex-col justify-between border border-white/20 bg-gray-100/10 backdrop-blur-md dark:bg-black/20 dark:border-white/10 rounded-xl p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {s.icon && <div className="mr-1">{s.icon}</div>}
                    <div className="text-sm text-black dark:text-slate-300 font-medium">
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

              <div className="-mt-1 text-xs text-slate-400 dark:text-white">
                {s.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
