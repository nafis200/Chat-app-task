import { CheckCircle, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";


export const Sidebars = ({ currentStep, completedSteps }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const steps = ["Login", "Register", "Review"];

  return (
    <>
      {/* Mobile Toggle Button - Fixed at top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
          p-8 flex flex-col overflow-hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-none
        `}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-12 mt-12 lg:mt-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">FormFlow</h1>
            </div>
            <p className="text-slate-400 text-sm">Complete your registration journey</p>
          </div>

          <div className="space-y-8">
            {steps.map((label, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = currentStep === index;

              return (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                      isCompleted 
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50" 
                        : isActive 
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 scale-110" 
                        : "bg-slate-700/50 border-2 border-slate-600"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="text-white w-6 h-6" />
                      ) : (
                        <span className={`font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : isCompleted ? "text-green-400" : "text-slate-500"
                      }`}>
                        {label}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isCompleted ? "Completed" : isActive ? "In progress" : "Pending"}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`absolute left-6 top-14 w-0.5 h-8 transition-all duration-500 ${
                      isCompleted ? "bg-gradient-to-b from-green-400 to-emerald-500" : "bg-slate-700"
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-400 leading-relaxed">
              Your information is secure and encrypted. We respect your privacy.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};