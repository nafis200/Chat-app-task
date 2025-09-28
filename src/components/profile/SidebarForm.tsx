"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebars from "./sidebars/Sidebars";
import Register from "./Signup/Register";
import Login from "./Signup/Login";

const SidebarForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData((prev:any) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitAll = () => {
    console.log("All Form Data:", formData);
    alert("✅ All data submitted! Check console.");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebars currentStep={currentStep} completedSteps={completedSteps} />

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-lg p-6 shadow-lg rounded-md bg-white">
          {currentStep === 0 && <Login onNext={handleNext} />}
          {currentStep === 1 && <Register onNext={handleNext} onPrev={handlePrev} />}
          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Review & Submit</h2>
              <pre className="bg-gray-100 p-4 rounded text-left">
                {JSON.stringify(formData, null, 2)}
              </pre>
              <Button className="w-full mt-4" onClick={handleSubmitAll}>
                Submit All
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SidebarForm;
