import AIMLCard from "@/components/Graph/AIMLCard";
import { ChartAreaAxes } from "@/components/Graph/AreaChart";
import { InterviewChart } from "@/components/Graph/Graph";
import PerformanceChart from "@/components/Graph/PerformanceChart";
import ShadcnStatsCard from "@/components/Graph/ShadcnStatsCard";
import SummarySection from "@/components/Graph/SummarySection";
import React from "react";

const page = () => {
  return (
    <div>
      <div>
        <ShadcnStatsCard />
      </div>

      <SummarySection />
      <div>
        <InterviewChart />
      </div>
      <div>
        <PerformanceChart />
      </div>
      <div>
        <ChartAreaAxes />
      </div>
      <div>
        <AIMLCard/>
      </div>
    </div>
  );
};

export default page;
