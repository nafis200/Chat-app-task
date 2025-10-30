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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Total Time Spent</CardTitle>
          <Clock className="h-5 w-5 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{summary.total_time_spent_hours}h</div>
          <p className="text-sm opacity-80 mt-1">Hours invested in interviews</p>
        </CardContent>
      </Card>

      {/* 📊 Total Interviews */}
      <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Total Interviews</CardTitle>
          <BarChart3 className="h-5 w-5 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{summary.total_interviews}</div>
          <p className="text-sm opacity-80 mt-1">Interviews completed</p>
        </CardContent>
      </Card>

      {/* 🏆 Best Score */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Best Score</CardTitle>
          <Award className="h-5 w-5 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{summary.best_score}</div>
          <p className="text-sm opacity-80 mt-1">Highest performance</p>
        </CardContent>
      </Card>

      {/* ⚙️ Average Score */}
      <Card className="bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Average Score</CardTitle>
          <Gauge className="h-5 w-5 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{summary.average_score}</div>
          <p className="text-sm opacity-80 mt-1">Across all interviews</p>
        </CardContent>
      </Card>

      {/* 🚀 Improvement */}
      <Card className="bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Improvement</CardTitle>
          <TrendingUp className="h-5 w-5 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{summary.improvement}</div>
          <p className="text-sm opacity-80 mt-1">
            From first score ({summary.first_score}) → latest ({summary.latest_score})
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
