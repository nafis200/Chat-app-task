"use client";

import { useState, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, LineProps, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";

interface GrowthData {
  session_id: string;
  date: string;
  interview_type: string;
  score: number;
  duration_minutes: number;
  cumulative_average: number;
}

// ----------------------------
// Full dataset 2023-2026
// ----------------------------
const growthData: GrowthData[] = [
  // 2023
  { session_id: "uuid-2023-1", date: "2023-01-10T10:00:00Z", interview_type: "behavioral", score: 60, duration_minutes: 40, cumulative_average: 60 },
  { session_id: "uuid-2023-2", date: "2023-04-15T12:00:00Z", interview_type: "technical", score: 65, duration_minutes: 50, cumulative_average: 62 },
  { session_id: "uuid-2023-3", date: "2023-09-20T14:00:00Z", interview_type: "system-design", score: 70, duration_minutes: 55, cumulative_average: 65 },

  // 2024
  { session_id: "uuid-2024-1", date: "2024-02-05T10:00:00Z", interview_type: "behavioral", score: 68, duration_minutes: 45, cumulative_average: 68 },
  { session_id: "uuid-2024-2", date: "2024-06-18T11:00:00Z", interview_type: "technical", score: 72, duration_minutes: 50, cumulative_average: 70 },
  { session_id: "uuid-2024-3", date: "2024-10-12T12:00:00Z", interview_type: "system-design", score: 75, duration_minutes: 55, cumulative_average: 72 },

  // 2025
  { session_id: "uuid-1", date: "2025-01-10T10:00:00Z", interview_type: "behavioral", score: 65, duration_minutes: 45, cumulative_average: 65 },
  { session_id: "uuid-2", date: "2025-02-05T14:00:00Z", interview_type: "technical", score: 70, duration_minutes: 50, cumulative_average: 67 },
  { session_id: "uuid-3", date: "2025-03-12T11:00:00Z", interview_type: "behavioral", score: 75, duration_minutes: 60, cumulative_average: 70 },
  { session_id: "uuid-4", date: "2025-04-20T12:00:00Z", interview_type: "technical", score: 78, duration_minutes: 55, cumulative_average: 72 },
  { session_id: "uuid-5", date: "2025-05-15T13:00:00Z", interview_type: "system-design", score: 80, duration_minutes: 50, cumulative_average: 74 },
  { session_id: "uuid-6", date: "2025-06-18T10:00:00Z", interview_type: "behavioral", score: 82, duration_minutes: 60, cumulative_average: 76 },
  { session_id: "uuid-7", date: "2025-07-22T14:00:00Z", interview_type: "technical", score: 85, duration_minutes: 65, cumulative_average: 78 },
  { session_id: "uuid-8", date: "2025-08-05T11:00:00Z", interview_type: "system-design", score: 88, duration_minutes: 55, cumulative_average: 80 },
  { session_id: "uuid-9", date: "2025-09-10T12:00:00Z", interview_type: "behavioral", score: 87, duration_minutes: 60, cumulative_average: 82 },
  { session_id: "uuid-10", date: "2025-10-15T13:00:00Z", interview_type: "technical", score: 90, duration_minutes: 70, cumulative_average: 84 },
  { session_id: "uuid-11", date: "2025-11-20T14:00:00Z", interview_type: "behavioral", score: 92, duration_minutes: 60, cumulative_average: 87 },
  { session_id: "uuid-12", date: "2025-12-25T12:00:00Z", interview_type: "system-design", score: 95, duration_minutes: 65, cumulative_average: 89 },

  // 2026
  { session_id: "uuid-2026-1", date: "2026-03-10T10:00:00Z", interview_type: "behavioral", score: 70, duration_minutes: 50, cumulative_average: 70 },
  { session_id: "uuid-2026-2", date: "2026-07-20T14:00:00Z", interview_type: "technical", score: 75, duration_minutes: 55, cumulative_average: 72 },
];

export function InterviewChart() {
  const data = { growth_data: growthData };

 
  const years = ["2023", "2024", "2025", "2026"];
  const [selectedYear, setSelectedYear] = useState("2025");

  const chartData = useMemo(() => {
    const year = Number(selectedYear);
    const monthMap: { [key: string]: { total: number; count: number } } = {};

    data.growth_data
      .filter(d => new Date(d.date).getFullYear() === year)
      .forEach(d => {
        const month = new Date(d.date).toLocaleString("default", { month: "short" });
        if (!monthMap[month]) monthMap[month] = { total: 0, count: 0 };
        monthMap[month].total += d.cumulative_average;
        monthMap[month].count += 1;
      });

    const allMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return allMonths.map(m => ({
      month: m,
      cumulative_average: monthMap[m] ? Math.round(monthMap[m].total / monthMap[m].count) : 0
    }));
  }, [data, selectedYear]);

  return (
    <Card className="p-4 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-all duration-300 dark:text-white">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <CardTitle>Interview Performance</CardTitle>
          <CardDescription>{`Cumulative Average Scores - ${selectedYear}`}</CardDescription>
        </div>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px] mt-2 sm:mt-0">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(y => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 12, bottom: 5 }}>
            <CartesianGrid vertical={false}  />
            <XAxis dataKey="month" />
            <YAxis 
              domain={[0, 100]} 
              tickCount={6} 
              label={{ value: "Score", angle: -90, position: "insideLeft" }} 
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cumulative_average"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>

    </Card>
  );
}
