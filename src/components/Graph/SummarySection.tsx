"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SummarySection() {
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

  const { summary } = data;
  const improvementValue = summary.latest_score - summary.first_score;
  const isImproved = improvementValue >= 0;
  const improvementPercent: any = ((improvementValue / summary.first_score) * 100).toFixed(1);

  const cardBase =
    "relative overflow-hidden rounded-2xl border transition-all duration-500 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5";

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  );

  return (
    <section className="px-6 py-10 transition-colors duration-500 bg-white dark:bg-black">
      {/* Grid: 1 col on sm, 2 col on md, 4 col on lg+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Time Spent */}
        <div className={`${cardBase} bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900`}>
          <div className="flex gap-2 mb-3">
            <Badge text="time" color="#0284C7" />
            <Badge text="productivity" color="#10B981" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Total Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 text-neutral-700 dark:text-neutral-300">
            You have invested a total of <b>{summary.total_time_spent_hours} hours</b> in interviews.
          </CardContent>
        </div>

        {/* Total Interviews */}
        <div className={`${cardBase} bg-gradient-to-br from-pink-50 to-rose-50 dark:from-fuchsia-900 dark:to-rose-950`}>
          <div className="flex gap-2 mb-3">
            <Badge text="analytics" color="#DB2777" />
            <Badge text="interview" color="#F97316" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Total Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 text-neutral-700 dark:text-neutral-300">
            You have successfully completed <b>{summary.total_interviews}</b> interviews.
          </CardContent>
        </div>

        {/* Best Score */}
        <div className={`${cardBase} bg-gradient-to-br from-purple-50 to-violet-50 dark:from-violet-900 dark:to-purple-950`}>
          <div className="flex gap-2 mb-3">
            <Badge text="achievement" color="#9333EA" />
            <Badge text="performance" color="#EA580C" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Best Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2 text-neutral-700 dark:text-neutral-300">
            Your highest performance score achieved is <b>{summary.best_score}</b>.
          </CardContent>
        </div>

        {/* Overall Improvement */}
        <div className={`${cardBase} border-none shadow-lg bg-gradient-to-br transition-all duration-500 ${isImproved ? "from-green-400 via-green-500 to-emerald-600 dark:from-emerald-700 dark:via-green-800 dark:to-emerald-950" : "from-red-400 via-red-500 to-rose-600 dark:from-rose-700 dark:via-red-800 dark:to-red-950"}`}>
          <div className="flex gap-2 mb-3">
            <Badge text="progress" color={isImproved ? "#16A34A" : "#DC2626"} />
            <Badge text="growth" color={isImproved ? "#22C55E" : "#F97316"} />
          </div>

          <CardHeader className="p-0 flex justify-between items-center">
            <CardTitle className="text-lg font-semibold dark:text-white drop-shadow-sm">
              Overall Improvement
            </CardTitle>
            {isImproved ? (
              <TrendingUp className="h-5 w-5 text-white/90" />
            ) : (
              <TrendingDown className="h-5 w-5 text-white/90" />
            )}
          </CardHeader>

          <CardContent className="p-0 mt-6 flex flex-col items-center">
            <div className="w-20 h-20 mb-5">
              <CircularProgressbar
                value={Math.abs(improvementPercent)}
                text={`${isImproved ? "+" : ""}${improvementPercent}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "rgba(255,255,255,0.9)",
                  textColor: "#FFFFFF",
                  trailColor: "rgba(255,255,255,0.25)",
                })}
              />
            </div>

            <p className="text-center text-black dark:text-white text-sm mb-3 drop-shadow-sm">
              {isImproved
                ? `You’ve improved your performance by ${improvementPercent}% since your first interview.`
                : `Your performance dropped by ${Math.abs(improvementPercent)}% compared to your first interview.`}
            </p>

            <div className="flex justify-between items-center text-xs w-full mt-4 border-t border-white/30 pt-3">
              <div className="text-center flex-1">
                <div className="dark:text-white/70 ">First</div>
                <div className="font-semibold">{summary.first_score}</div>
              </div>
              <div className="text-white/50">→</div>
              <div className="text-center flex-1">
                <div className="dark:text-white/70">Latest</div>
                <div className="font-semibold">{summary.latest_score}</div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </section>
  );
}
