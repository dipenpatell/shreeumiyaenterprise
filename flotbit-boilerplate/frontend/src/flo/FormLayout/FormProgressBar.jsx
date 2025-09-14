import React, { useState } from "react";
import { FastBackward, FastForward } from "../../assets/icons/svgs";

export default function FormProgressBar({currentStep=-1, setCurrentStep=null, totalSteps=0, className="", style={}}) {

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`${className}
      flex justify-center items-center 
      m-auto mt-[1.375em] mb-[2.375em]
 
      px-[1.875em] pt-[1.5em] pb-[3.75em] 
      max-w-[62.5em] w-full 
      max-md:px-[1.5em] max-md:pt-0 max-md:pb-0`}
      style={{...style}}
    >
      <button
        onClick={handlePrevious}
        disabled={currentStep <= 0}
        style={{
          backgroundColor: "var(--form-button-bg-color)",
          boxShadow: "var(--form-btn-bg-shadow)",
        }}
        className="w-[68px] h-[68px] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FastBackward fill={"var(--form-primary-color)"} />
      </button>

      <div className="flex-1 mx-6 max-w-[400px]">
        <div className="text-[12px] text-[var(--nav-text-color)] mb-[6px]">
          {currentStep + 1}/{totalSteps}
        </div>
        <div
          style={{ boxShadow: "var(--form-btn-bg-shadow)" }}
          className="w-full bg-[var(--form-button-bg-color)] rounded-full h-[6px] overflow-hidden"
        >
          <div
            className="h-full bg-[var(--form-primary-color)] rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPercentage}%`,
              boxShadow: "var(--form-btn-bg-inset-shadow)",
            }}
          />
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={currentStep === totalSteps - 1}
        style={{
          backgroundColor: "var(--form-button-bg-color)",
          boxShadow: "var(--form-btn-bg-shadow)",
        }}
        className="w-[68px] h-[68px] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FastForward fill={"var(--form-primary-color)"} />
      </button>
    </div>
  );
}
