// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Clock,
//   BarChart3,
//   Award,
//   TrendingUp,
//   TrendingDown,
//   Gauge,
// } from "lucide-react";

// import {
//   CircularProgressbar,
//   buildStyles,
// } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// export default function SummarySection() {
//   const data = {
//     summary: {
//       total_interviews: 18,
//       total_time_spent_hours: 42,
//       latest_score: 79,
//       average_score: 78.5,
//       best_score: 92,
//       first_score: 50,
//     },
//   };

//   const { summary } = data;

//   const improvementValue = summary.latest_score - summary.first_score;
//   const isImproved = improvementValue >= 0;
//   const improvementPercent:any = (
//     (improvementValue / summary.first_score) *
//     100
//   ).toFixed(1);

//   return (
//     <section className="p-8 transition-colors duration-500 flex flex-col lg:flex-row gap-6">
//       {/* LEFT SIDE — 4 summary cards */}
//       <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//         {/* Total Time Spent */}
//         <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
//           <CardHeader className="pb-2 flex justify-between items-center">
//             <CardTitle className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
//               Total Time Spent
//             </CardTitle>
//             <Clock className="h-5 w-5 text-sky-500" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-semibold text-neutral-900 dark:text-white">
//               {summary.total_time_spent_hours}h
//             </p>
//             <p className="text-sm text-neutral-500 dark:text-neutral-400">
//               Hours invested in interviews
//             </p>
//           </CardContent>
//         </Card>

//         {/* Total Interviews */}
//         <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
//           <CardHeader className="pb-2 flex justify-between items-center">
//             <CardTitle className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
//               Total Interviews
//             </CardTitle>
//             <BarChart3 className="h-5 w-5 text-amber-500" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-semibold text-neutral-900 dark:text-white">
//               {summary.total_interviews}
//             </p>
//             <p className="text-sm text-neutral-500 dark:text-neutral-400">
//               Interviews completed
//             </p>
//           </CardContent>
//         </Card>

//         {/* Best Score */}
//         <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
//           <CardHeader className="pb-2 flex justify-between items-center">
//             <CardTitle className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
//               Best Score
//             </CardTitle>
//             <Award className="h-5 w-5 text-indigo-500" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl font-semibold text-neutral-900 dark:text-white">
//               {summary.best_score}
//             </p>
//             <p className="text-sm text-neutral-500 dark:text-neutral-400">
//               Highest performance
//             </p>
//           </CardContent>
//         </Card>

//         {/* Average Score Overview */}
//         <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md rounded-2xl">
//           <CardHeader className="flex justify-between items-center pb-4">
//             <CardTitle className="text-sm font-medium text-neutral-700 dark:text-neutral-100">
//               Average Score Overview
//             </CardTitle>
//             <Gauge className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div className="w-2/3">
//                 <div className="text-5xl font-bold text-neutral-900 dark:text-white">
//                   {summary.average_score}%
//                 </div>
//                 <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
//                   Across all interviews
//                 </p>
//                 <div className="mt-4 w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-700"
//                     style={{ width: `${summary.average_score}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>





//       <div className="w-full lg:w-80">
//         <Card
//           className={`border border-neutral-200 dark:border-neutral-800 shadow-md rounded-2xl transition-all duration-300 h-full  ${
//             isImproved
//               ? "bg-green-50 dark:bg-green-900/20"
//               : "bg-red-50 dark:bg-red-900/20"
//           }`}
//         >
//           <CardHeader className="flex justify-between items-center pb-3">
//             <CardTitle
//               className={`text-sm font-medium uppercase ${
//                 isImproved
//                   ? "text-green-700 dark:text-green-300"
//                   : "text-red-700 dark:text-red-300"
//               }`}
//             >
//               Overall Improvement
//             </CardTitle>
//             {isImproved ? (
//               <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400" />
//             ) : (
//               <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-400" />
//             )}
//           </CardHeader>

//           <CardContent>
//             {/* Points Difference */}
//             <div className="flex items-baseline gap-3 mb-3">
//               <div
//                 className={`text-5xl font-bold ${
//                   isImproved
//                     ? "text-green-700 dark:text-green-300"
//                     : "text-red-700 dark:text-red-300"
//                 }`}
//               >
//                 {isImproved ? `+${improvementValue}` : improvementValue}
//               </div>
//               <div
//                 className={`text-base font-medium ${
//                   isImproved
//                     ? "text-green-600 dark:text-green-400"
//                     : "text-red-600 dark:text-red-400"
//                 }`}
//               >
//                 points
//               </div>
//             </div>

//             {/* Percentage Improvement Graph */}
//             <div className="flex items-center justify-center mb-6">
//               <div className="w-28 h-28 mt-5">
//                 <CircularProgressbar
//                   value={Math.abs(improvementPercent)}
//                   text={`${isImproved ? "+" : "-"}${improvementPercent}%`}
//                   styles={buildStyles({
//                     textSize: "14px",
//                     pathColor: isImproved ? "#22c55e" : "#ef4444",
//                     textColor: isImproved ? "#22c55e" : "#ef4444",
//                     trailColor: "#e5e7eb",
//                   })}
//                 />
//               </div>
//             </div>

//             {/* SVG Trend Line */}
//             <div className="h-24 w-full relative mb-4">
//               <svg
//                 viewBox="0 0 100 40"
//                 preserveAspectRatio="none"
//                 className="absolute inset-0 w-full h-full"
//               >
//                 <polyline
//                   fill="none"
//                   stroke={isImproved ? "#22c55e" : "#ef4444"}
//                   strokeWidth="3"
//                   points={
//                     isImproved
//                       ? "0,30 25,25 50,20 75,10 100,5"
//                       : "0,10 25,15 50,20 75,30 100,35"
//                   }
//                 />
//               </svg>
//             </div>

//             {/* Score Labels */}
//             <div
//               className={`flex items-center gap-4 text-sm ${
//                 isImproved
//                   ? "text-green-700 dark:text-green-300"
//                   : "text-red-700 dark:text-red-300"
//               }`}
//             >
//               <span>
//                 First{" "}
//                 <span className="font-semibold text-neutral-900 dark:text-white">
//                   {summary.first_score}
//                 </span>
//               </span>
//               <span>→</span>
//               <span>
//                 Latest{" "}
//                 <span className="font-semibold text-neutral-900 dark:text-white">
//                   {summary.latest_score}
//                 </span>
//               </span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// }



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  BarChart3,
  Award,
  Gauge,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SummarySection() {
  const data = {
    summary: {
      total_interviews: 18,
      total_time_spent_hours: 42,
      latest_score: 40,
      average_score: 78.5,
      best_score: 92,
      first_score: 50,
    },
  };

  const { summary } = data;

  const improvementValue = summary.latest_score - summary.first_score;
  const isImproved = improvementValue >= 0;
  const improvementPercent:any = (
    (improvementValue / summary.first_score) *
    100
  ).toFixed(1);

  return (
    <section className="p-8 flex flex-col lg:flex-row gap-6 transition-colors duration-500">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Time Spent */}
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
          <CardHeader className="pb-3 flex justify-between items-center">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Total Time Spent
            </CardTitle>
            <Clock className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {summary.total_time_spent_hours}h
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Hours invested in interviews
            </p>
          </CardContent>
        </Card>

        {/* Total Interviews */}
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
          <CardHeader className="pb-3 flex justify-between items-center">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Total Interviews
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {summary.total_interviews}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Interviews completed
            </p>
          </CardContent>
        </Card>

        {/* Best Score */}
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
          <CardHeader className="pb-3 flex justify-between items-center">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Best Score
            </CardTitle>
            <Award className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {summary.best_score}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Highest performance
            </p>
          </CardContent>
        </Card>

        {/* Average Score Overview */}
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
          <CardHeader className="flex justify-between items-center pb-3">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Average Score
            </CardTitle>
            <Gauge className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                  {summary.average_score}%
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                  Across all interviews
                </p>
                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 dark:bg-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${summary.average_score}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-80">
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg h-full">
          <CardHeader className="flex justify-between items-center pb-3">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Overall Improvement
            </CardTitle>
            {isImproved ? (
              <TrendingUp className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
            )}
          </CardHeader>

          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                {isImproved ? `+${improvementValue}` : improvementValue}
              </div>
              <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                points
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={Math.abs(improvementPercent)}
                  text={`${isImproved ? "+" : ""}${improvementPercent}%`}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#3B82F6",
                    textColor: "#3B82F6",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
            </div>

            <div className="h-20 w-full relative mb-4">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  points={isImproved ? "0,30 25,25 50,20 75,10 100,5" : "0,10 25,15 50,20 75,30 100,35"}
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
              <div>
                <div className="text-neutral-400 dark:text-neutral-500">First</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">{summary.first_score}</div>
              </div>
              <div className="text-neutral-300 dark:text-neutral-600">→</div>
              <div>
                <div className="text-neutral-400 dark:text-neutral-500">Latest</div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">{summary.latest_score}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}