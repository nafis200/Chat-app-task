"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BarChart3, Award, TrendingUp, Gauge } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SummarySection() {
  const data = {
    summary: {
      total_interviews: 18,
      total_time_spent_hours: 42,
      latest_score: 87,
      average_score: 78.5,
      best_score: 92,
      first_score: 65,
      improvement: "+22",
    },
  };

  const { summary } = data;

  return (
    <section className="p-8 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 min-h-screen">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* LEFT SIDE: Performance Overview */}
        <div className="space-y-6 lg:col-span-2">
          {/* Transfer / Flow Style Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Time Spent */}
            <Card className="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-950/50 border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Total Time Spent
                </CardTitle>
                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-200">
                  {summary.total_time_spent_hours}h
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Hours invested in interviews
                </p>
              </CardContent>
            </Card>

            {/* Total Interviews */}
            <Card className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-950/50 border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Total Interviews
                </CardTitle>
                <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-amber-700 dark:text-amber-200">
                  {summary.total_interviews}
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Interviews completed
                </p>
              </CardContent>
            </Card>

            {/* Best Score */}
            <Card className="bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-950/50 border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  Best Score
                </CardTitle>
                <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-indigo-700 dark:text-indigo-200">
                  {summary.best_score}
                </p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Highest performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Average Score Progress Section */}
          <Card className="border-none bg-white dark:bg-neutral-900/60 shadow-md rounded-2xl">
            <CardHeader className="flex flex-row justify-between items-center pb-4">
              <CardTitle className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">
                Average Score Overview
              </CardTitle>
              <Gauge className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-2/3">
                  <div className="text-5xl font-bold text-neutral-900 dark:text-white">
                    {summary.average_score}%
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    Across all interviews
                  </p>
                  <div className="mt-4 w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${summary.average_score}%` }}
                    />
                  </div>
                </div>
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={summary.average_score}
                    text={`${summary.average_score}%`}
                    styles={buildStyles({
                      textSize: "24px",
                      pathColor: "#22c55e",
                      textColor: "#22c55e",
                      trailColor: "#e5e7eb",
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improvement Card */}
          <Card className="border-none bg-gradient-to-r from-green-500/10 via-green-400/10 to-emerald-500/10 dark:from-green-800/30 dark:to-emerald-900/30 shadow-md">
            <CardHeader className="flex flex-row justify-between items-center pb-3">
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase">
                Overall Improvement
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3 mb-3">
                <div className="text-5xl font-bold text-green-700 dark:text-green-200">
                  {summary.improvement}
                </div>
                <div className="text-base font-medium text-green-600 dark:text-green-400">
                  points
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-green-600 dark:text-green-400">
                <span>
                  First{" "}
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    {summary.first_score}
                  </span>
                </span>
                <span>→</span>
                <span>
                  Latest{" "}
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    {summary.latest_score}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE: Audience Overview */}
        <div className="flex flex-col gap-6">
          <Card className="border-none bg-white dark:bg-neutral-900/70 shadow-md rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold text-neutral-700 dark:text-neutral-100">
                Audience Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="w-36 h-36">
                <CircularProgressbar
                  value={48}
                  text={`48%`}
                  styles={buildStyles({
                    pathColor: "#f59e0b",
                    textColor: "#f59e0b",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>
              <div className="w-full text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    18–24 years
                  </span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    25–40 years
                  </span>
                  <span className="font-medium">48%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    40–55 years
                  </span>
                  <span className="font-medium">16%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    55+ years
                  </span>
                  <span className="font-medium">11%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
