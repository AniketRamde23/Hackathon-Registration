import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Sign In", "Your Info", "Your Team", "Review"];

  return (
    <div className="w-full py-6 mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -mt-px w-full h-[2px] bg-white/10 z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -mt-px h-[2px] bg-[#7C3AED] z-0 transition-all duration-700 ease-out" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] scale-110' 
                    : isCurrent 
                      ? 'bg-[#0B0F19] border-2 border-[#7C3AED] text-[#7C3AED] scale-110 shadow-[0_0_15px_rgba(124,58,237,0.2)]' 
                      : 'bg-[#0B0F19] border-2 border-white/20 text-gray-600'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : stepNumber}
              </div>
              <div className={`mt-4 text-xs md:text-sm font-medium absolute top-12 whitespace-nowrap transition-colors duration-300 ${isCurrent || isCompleted ? 'text-gray-200' : 'text-gray-600'}`}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
