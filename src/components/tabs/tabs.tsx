"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs } from "../ui/tabs";
import PersonalInformation from "../profile/profileSection/PersonalInformation";
import ProfessionalDetails from "../profile/profileSection/ProfessionalDetails";
import SecurityAccount from "../profile/profileSection/SecurityAccount";
import ProfileImageUpload from "../profile/profileSection/ProfileImageUpload";
import ResumePortfolio from "../profile/profileSection/ResumePortfolio";
import AvailabilityPreferences from "../profile/profileSection/AvailabilityPreferences";

export function TabsDemo() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || "PersonalInformation";
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
   
    {
      title: "Resume",
      value: "Resume",
      content: <PersonalInformation />,
    },
    {
      title: "ProfessionalDetails",
      value: "ProfessionalDetails",
      content: <ProfessionalDetails />,
    },
    {
      title: "SecurityAccount",
      value: "SecurityAccount",
      content: <SecurityAccount />,
    },
    {
      title: "AvailabilityPreferences",
      value: "AvailabilityPreferences",
      content: <AvailabilityPreferences />,
    },
  ];
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", activeTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeTab, router]);

  return (
    <div className="w-full flex flex-col mt-5 ">
      <Tabs
        tabs={tabs}
        value={activeTab}   
        onChange={setActiveTab}  
      />
    </div>
  );
}
