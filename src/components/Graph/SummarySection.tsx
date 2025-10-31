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
    "relative overflow-hidden rounded-2xl border transition-all duration-500 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1";

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  );

  return (
    <section className="px-6 py-10 flex flex-col lg:flex-row gap-8 transition-colors duration-500 bg-white dark:bg-black">
      {/* Left grid section */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Time */}
        <div
          className={`${cardBase} bg-gradient-to-br from-sky-100 to-emerald-50 dark:from-slate-800 dark:to-slate-900`}
        >
          <div className="flex gap-2 mb-3">
            <Badge text="time" color="#0284C7" />
            <Badge text="productivity" color="#10B981" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Total Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              You have invested a total of <b>{summary.total_time_spent_hours} hours</b> in interviews.
            </p>
            <p className="text-xs text-neutral-500 mt-2">Updated 10/31/2025</p>
          </CardContent>
        </div>

        {/* Total Interviews */}
        <div
          className={`${cardBase} bg-gradient-to-br from-pink-100 to-rose-50 dark:from-fuchsia-900 dark:to-rose-950`}
        >
          <div className="flex gap-2 mb-3">
            <Badge text="analytics" color="#DB2777" />
            <Badge text="interview" color="#F97316" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Total Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              You have successfully completed <b>{summary.total_interviews}</b> interviews.
            </p>
            <p className="text-xs text-neutral-500 mt-2">Updated 10/31/2025</p>
          </CardContent>
        </div>

        {/* Best Score */}
        <div
          className={`${cardBase} bg-gradient-to-br from-purple-100 to-violet-50 dark:from-violet-900 dark:to-purple-950`}
        >
          <div className="flex gap-2 mb-3">
            <Badge text="achievement" color="#9333EA" />
            <Badge text="performance" color="#EA580C" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Best Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              Your highest performance score achieved is <b>{summary.best_score}</b>.
            </p>
            <p className="text-xs text-neutral-500 mt-2">Updated 10/31/2025</p>
          </CardContent>
        </div>

        {/* Average Score */}
        <div
          className={`${cardBase} bg-gradient-to-br from-lime-100 to-green-50 dark:from-green-900 dark:to-lime-950`}
        >
          <div className="flex gap-2 mb-3">
            <Badge text="consistency" color="#65A30D" />
            <Badge text="average" color="#84CC16" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-black dark:text-white">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              Your average performance across all interviews is <b>{summary.average_score}%</b>.
            </p>
            <p className="text-xs text-neutral-500 mt-2">Updated 10/31/2025</p>
          </CardContent>
        </div>
      </div>

      {/* Overall Improvement */}
      
      <div className="w-full lg:w-80">
  <div
    className={`${cardBase} text-white border-none shadow-lg bg-gradient-to-br transition-all duration-500 ${
      isImproved
        ? // 💚 Brighter, eye-catching green gradient
          "from-green-400 via-emerald-500 to-green-600 dark:from-green-600 dark:via-emerald-700 dark:to-green-900"
        : // ❤️ Clean, alert red gradient
          "from-red-400 via-rose-500 to-red-600 dark:from-red-700 dark:via-rose-800 dark:to-red-950"
    }`}
  >
    <div className="flex gap-2 mb-3">
      <Badge text="progress" color={isImproved ? "#16A34A" : "#DC2626"} />
      <Badge text="growth" color={isImproved ? "#22C55E" : "#F97316"} />
    </div>

    <CardHeader className="p-0 flex justify-between items-center">
      <CardTitle className="text-lg font-semibold text-white drop-shadow-sm">
        Overall Improvement
      </CardTitle>
      {isImproved ? (
        <TrendingUp className="h-5 w-5 text-white/90" />
      ) : (
        <TrendingDown className="h-5 w-5 text-white/90" />
      )}
    </CardHeader>

    <CardContent className="p-0 mt-6 flex flex-col items-center">
      <div className="w-28 h-28 mb-5">
        <CircularProgressbar
          value={Math.abs(improvementPercent)}
          text={`${isImproved ? "+" : ""}${improvementPercent}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "rgba(255,255,255,0.95)",
            textColor: "#FFFFFF",
            trailColor: "rgba(255,255,255,0.25)",
          })}
        />
      </div>

      <p className="text-center text-white/90 text-sm mb-3 drop-shadow-sm">
        {isImproved
          ? `You’ve improved your performance by ${improvementPercent}% since your first interview.`
          : `Your performance dropped by ${Math.abs(improvementPercent)}% compared to your first interview.`}
      </p>

      <div className="h-16 w-full relative mt-2">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-80"
        >
          <polyline
            fill="none"
            stroke="white"
            strokeWidth="2"
            points={
              isImproved
                ? "0,30 25,25 50,20 75,10 100,5"
                : "0,10 25,15 50,25 75,35 100,40"
            }
          />
        </svg>
      </div>

      <div className="flex justify-between items-center text-xs w-full mt-4 border-t border-white/30 pt-3">
        <div className="text-center flex-1">
          <div className="text-white/70">First</div>
          <div className="font-semibold">{summary.first_score}</div>
        </div>
        <div className="text-white/50">→</div>
        <div className="text-center flex-1">
          <div className="text-white/70">Latest</div>
          <div className="font-semibold">{summary.latest_score}</div>
        </div>
      </div>
    </CardContent>
  </div>
</div>

    </section>
  );
}
