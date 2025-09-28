"use client";
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

type SidebarProps = {
  currentStep: number;
  completedSteps: number[];
};

const steps = ["Login", "Register", "Review & Submit"];

const Sidebars = ({ currentStep, completedSteps }: SidebarProps) => {
  return (
    <aside className="w-64 bg-gray-50 border-r p-6 flex flex-col space-y-6">
      <h2 className="text-xl font-bold mb-4">Steps</h2>
      <ul className="space-y-4">
        {steps.map((label, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = currentStep === index;

          return (
            <li key={index} className="flex items-center space-x-3">
              <div className="relative">
                {isCompleted ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <Circle
                    className={`w-6 h-6 ${
                      isActive ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                )}
                {index < steps.length - 1 && (
                  <span
                    className={`absolute left-1/2 top-6 w-0.5 h-8 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                )}
              </div>
              <span
                className={`font-medium ${
                  isActive
                    ? "text-blue-500"
                    : isCompleted
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebars;
