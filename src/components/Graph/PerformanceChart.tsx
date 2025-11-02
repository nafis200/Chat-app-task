"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef, useMemo, useState } from "react";
import { Calendar, TrendingUp, ArrowUp } from "lucide-react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function PerformanceChart() {
  const [range, setRange] = useState("01–07 May");
  const chartRef = useRef(null);

  const data = useMemo(() => {
    const ctx = chartRef.current?.ctx;

    let blueGradient = "rgba(79,70,229,0.1)";
    let purpleGradient = "rgba(168,85,247,0.05)";
    
    if (ctx) {
      blueGradient = ctx.createLinearGradient(0, 0, 0, 350);
      blueGradient.addColorStop(0, "rgba(79,70,229,0.4)");
      blueGradient.addColorStop(0.6, "rgba(79,70,229,0.15)");
      blueGradient.addColorStop(1, "rgba(79,70,229,0)");

      purpleGradient = ctx.createLinearGradient(0, 0, 0, 350);
      purpleGradient.addColorStop(0, "rgba(168,85,247,0.2)");
      purpleGradient.addColorStop(1, "rgba(168,85,247,0)");
    }

    return {
      labels: ["01", "02", "03", "04", "05", "06", "07"],
      datasets: [
        {
          label: "This Month",
          data: [8, 6, 7, 5, 9, 10, 8],
          borderColor: "#4F46E5",
          backgroundColor: blueGradient,
          fill: true,
          tension: 0.42,
          borderWidth: 3.5,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#4F46E5",
          pointBorderWidth: 3.5,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointHoverBackgroundColor: "#4F46E5",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 4,
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 12,
          shadowColor: "rgba(79,70,229,0.3)",
        },
        {
          label: "Last Month",
          data: [6, 5, 6, 4, 8, 7, 6],
          borderColor: "#A855F7",
          backgroundColor: purpleGradient,
          fill: true,
          tension: 0.42,
          borderWidth: 3,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#A855F7",
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#A855F7",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3.5,
        },
      ],
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.96)",
        titleColor: "#fff",
        bodyColor: "#CBD5E1",
        cornerRadius: 12,
        padding: 16,
        displayColors: true,
        usePointStyle: true,
        pointStyle: 'circle',
        titleFont: { family: "Inter, sans-serif", size: 14, weight: "700" },
        bodyFont: { family: "Inter, sans-serif", size: 13, weight: "500" },
        bodySpacing: 8,
        boxPadding: 8,
        borderColor: "rgba(148,163,184,0.2)",
        borderWidth: 1,
        caretPadding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: "rgba(203,213,225,0.4)",
          borderDash: [8, 4],
          drawBorder: false,
          lineWidth: 1.5,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#94A3B8",
          font: { family: "Inter, sans-serif", size: 13, weight: "600" },
          stepSize: 2,
          padding: 12,
          callback: function(value) {
            return value;
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: { family: "Inter, sans-serif", size: 13, weight: "700" },
          padding: 12,
        },
      },
    },
  };

  const currentValue = 8;
  const previousValue = 6;
  const percentChange = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
  const peakValue = 10;
  const avgValue = 7.6;

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 rounded-3xl shadow-2xl border border-slate-200/60">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-6">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-2xl tracking-tight">Performance Analytics</h2>
              <p className="text-slate-500 text-sm font-medium mt-0.5">Track your monthly progress</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-md shadow-indigo-500/40 group-hover:scale-110 transition-transform"></div>
              <span className="text-slate-700 font-semibold text-sm">This Month</span>
            </div>
            <div className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-md shadow-purple-500/40 group-hover:scale-110 transition-transform"></div>
              <span className="text-slate-700 font-semibold text-sm">Last Month</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 pointer-events-none group-hover:scale-110 transition-transform" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="pl-12 pr-5 py-3.5 border-2 border-slate-200 rounded-2xl text-sm text-slate-700 bg-white hover:border-indigo-400 hover:shadow-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none font-bold transition-all cursor-pointer shadow-md appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234F46E5' d='M6 9L1.5 4.5h9z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
              }}
            >
              <option>01–07 May</option>
              <option>08–14 May</option>
              <option>15–21 May</option>
              <option>22–28 May</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2.5 rounded-xl border-2 border-emerald-200 shadow-md">
            <div className="p-1 bg-emerald-500 rounded-full">
              <ArrowUp className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-emerald-700 font-extrabold text-base">{percentChange}%</span>
            <span className="text-emerald-600 text-xs font-bold">Growth</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[340px] sm:h-[400px] md:h-[450px] bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 mb-6">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 shadow-lg shadow-indigo-500/30 border border-indigo-400/20 hover:scale-105 transition-transform cursor-pointer">
          <div className="text-xs text-indigo-100 font-bold mb-2 uppercase tracking-wider">Current Value</div>
          <div className="text-3xl font-extrabold text-white">{currentValue}</div>
          <div className="text-xs text-indigo-200 font-medium mt-1">Latest data point</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-lg shadow-purple-500/30 border border-purple-400/20 hover:scale-105 transition-transform cursor-pointer">
          <div className="text-xs text-purple-100 font-bold mb-2 uppercase tracking-wider">Previous</div>
          <div className="text-3xl font-extrabold text-white">{previousValue}</div>
          <div className="text-xs text-purple-200 font-medium mt-1">Last period</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg shadow-emerald-500/30 border border-emerald-400/20 hover:scale-105 transition-transform cursor-pointer">
          <div className="text-xs text-emerald-100 font-bold mb-2 uppercase tracking-wider">Peak Value</div>
          <div className="text-3xl font-extrabold text-white">{peakValue}</div>
          <div className="text-xs text-emerald-200 font-medium mt-1">Highest point</div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 shadow-lg shadow-amber-500/30 border border-amber-400/20 hover:scale-105 transition-transform cursor-pointer">
          <div className="text-xs text-amber-100 font-bold mb-2 uppercase tracking-wider">Average</div>
          <div className="text-3xl font-extrabold text-white">{avgValue}</div>
          <div className="text-xs text-amber-200 font-medium mt-1">Mean value</div>
        </div>
      </div>
    </div>
  );
}