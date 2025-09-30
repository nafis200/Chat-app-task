"use client";
import React, { useState } from "react";
import { Sidebars } from "./sidebars/Sidebars";
import PersonalInformation from "./profileSection/PersonalInformation";
import ProfessionalDetails from "./profileSection/ProfessionalDetails";
import SecurityAccount from "./profileSection/SecurityAccount";
import ProfileImageUpload from "./profileSection/ProfileImageUpload";
import ResumePortfolio from "./profileSection/ResumePortfolio";
import AvailabilityPreferences from "./profileSection/AvailabilityPreferences";
import ReviewSubmit from "./profileSection/ReviewSubmit";

const SidebarForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    const remainArray = completedSteps.filter((x) => x != currentStep - 1);
    setCompletedSteps(remainArray);
  };

  const handleSubmitAll = () => {
    console.log("All Form Data:", formData);
    alert("✅ All data submitted! Check console.");
    setFormData({});
  };

  return (
    <div className="flex min-h-screen">
      <Sidebars currentStep={currentStep} completedSteps={completedSteps} />
      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full p-6 shadow-lg rounded-md">
          {currentStep === 0 && (
            <PersonalInformation onNext={handleNext} defaultValues={formData} />
          )}
          {currentStep === 1 && (
            <ProfessionalDetails
              onNext={handleNext}
              onPrev={handlePrev}
              defaultValues={formData}
            />
          )}
          {currentStep === 2 && (
            <SecurityAccount
              onNext={handleNext}
              onPrev={handlePrev}
              defaultValues={formData}
            />
          )}
          {currentStep === 3 && (
            <ProfileImageUpload
              onNext={handleNext}
              onPrev={handlePrev}
              defaultValues={formData}
            />
          )}
          {currentStep === 4 && (
            <ResumePortfolio
              onNext={handleNext}
              onPrev={handlePrev}
              defaultValues={formData}
            />
          )}
          {currentStep === 5 && (
            <AvailabilityPreferences
              onNext={handleNext}
              onPrev={handlePrev}
              defaultValues={formData}
            />
          )}
          {currentStep === 6 && (
            <div>
              <ReviewSubmit
                formData={formData}
                onPrev={handlePrev}
                onSubmitAll={handleSubmitAll}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SidebarForm;
