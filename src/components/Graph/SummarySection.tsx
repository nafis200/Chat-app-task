import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BarChart3, Award, TrendingUp, Gauge } from "lucide-react";

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
    <section className="p-8 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          {[
            {
              title: "Total Time Spent",
              value: `${summary.total_time_spent_hours}h`,
              subtitle: "Hours invested in interviews",
              icon: <Clock className="h-5 w-5" />,
            },
            {
              title: "Total Interviews",
              value: summary.total_interviews,
              subtitle: "Interviews completed",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              title: "Best Score",
              value: summary.best_score,
              subtitle: "Highest performance",
              icon: <Award className="h-5 w-5" />,
            },
            {
              title: "Average Score",
              value: summary.average_score,
              subtitle: "Across all interviews",
              icon: <Gauge className="h-5 w-5" />,
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="border border-neutral-200 dark:border-neutral-800 bg-transparent 
                         backdrop-blur-sm 
                         transition-transform duration-300 ease-in-out 
                         hover:scale-105 hover:shadow-lg hover:bg-neutral-50/30 dark:hover:bg-neutral-900/50"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-neutral-600 dark:text-white tracking-wide">
                  {item.title}
                </CardTitle>
                <div className="text-neutral-800 dark:text-neutral-200">{item.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold text-black dark:text-white">
                  {item.value}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {item.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Improvement Card */}
          <Card
            className="col-span-2 lg:col-span-2 border border-neutral-200 dark:border-neutral-800 
                       bg-neutral-100/30 dark:bg-neutral-900/70 backdrop-blur-md 
                       transition-transform duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wide text-neutral-700 dark:text-white">
                Overall Improvement
              </CardTitle>
              <div className="text-neutral-700 dark:text-neutral-300">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3 mb-3">
                <div className="text-5xl font-bold text-black dark:text-white">
                  {summary.improvement}
                </div>
                <div className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                  points
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <span>
                  First <span className="font-semibold text-black dark:text-white">{summary.first_score}</span>
                </span>
                <span>→</span>
                <span>
                  Latest <span className="font-semibold text-black dark:text-white">{summary.latest_score}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
