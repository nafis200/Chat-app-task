import { InterviewChart } from "@/components/Graph/Graph";
import SummarySection from "@/components/Graph/SummarySection";
import React from "react";

const page = () => {
  return (
    <div>
      <SummarySection />
      <div>
        <InterviewChart />
      </div>
    </div>
  );
};

export default page;
