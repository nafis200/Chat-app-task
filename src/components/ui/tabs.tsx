"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  value,
  onChange,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [active, setActive] = useState<Tab>(
    propTabs.find((t) => t.value === value) || propTabs[0]
  );

  useEffect(() => {
    if (value) {
      const matched = propTabs.find((t) => t.value === value);
      if (matched) {
        setActive(matched);
      }
    }
  }, [value, propTabs]);

  const handleTabChange = (idx: number) => {
    const selectedTab = propTabs[idx];
    setActive(selectedTab);
    onChange?.(selectedTab.value);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "w-full flex lg:ml-2 lg:justify-start lg:items-start gap-4 overflow-x-auto py-2 px-2 no-visible-scrollbar",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(idx)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-200", 
              tabClassName,
              active.value === tab.value
                ? cn("bg-blue-200/50 rounded-xl dark:bg-zinc-800 font-semibold", activeTabClassName)
                : "hover:bg-gray-100 dark:hover:bg-zinc-700"
            )}
          >
            <span className={`font-medium ${active.value === tab.value ? "text-blue-700" : "text-black dark:text-white"}`}>{tab.title}</span>
          </button>
        ))}
      </div>
      <div
        className={cn(
          "w-full mt-0 p-0 rounded-xl shadow-none",
          contentClassName
        )}
      >
        {active.content}
      </div>
    </div>
  );
};
