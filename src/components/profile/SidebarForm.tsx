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
import { useRouter } from "next/navigation";
const SidebarForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();
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

    alert("✅ All data submitted! Check console.");
    setFormData({});
    const normalized:any = {};
    for(const key in formData){
       if(Array.isArray(formData[key])){
          normalized[key] = formData[key][0]
       }
       else{
         normalized[key] = formData[key]
       }
    }

    console.log(normalized)
    
    router.push("/")
  };

  return (
    <div className="flex min-h-screen">
      <Sidebars currentStep={currentStep} completedSteps={completedSteps} />
      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full p-6 shadow-lg rounded-md">
          {currentStep === 0 && (
            <PersonalInformation/>
          )}
          {currentStep === 1 && (
            <ProfessionalDetails/>
          )}
          {currentStep === 2 && (
            <SecurityAccount/>
          )}
          {currentStep === 3 && (
            <ProfileImageUpload />
          )}
          {currentStep === 4 && (
            <ResumePortfolio/>
          )}
          {currentStep === 5 && (
            <AvailabilityPreferences/>
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
