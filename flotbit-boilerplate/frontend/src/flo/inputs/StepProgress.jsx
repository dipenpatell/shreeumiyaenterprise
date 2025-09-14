import React, { useEffect, useState, useCallback } from "react";

function StepProgress({
  defaultValue = 1,
  total = 3,
  onChange = null,
  showLabels = true,
  style = {},
  className = "",
}) {

  const [currentStep, setCurrentStep] = useState(defaultValue);

  useEffect(() => {
    setCurrentStep(defaultValue);
  }, [defaultValue]);
  
  // Generate step array
  const stepArray = Array.from({ length: total }, (_, i) => i + 1);

  const handleStepClick = useCallback((stepNumber) => {
    setCurrentStep(stepNumber);
    onChange?.(stepNumber);
  }, [onChange]);

  return (
    <div
      style={{
        ...style,
      }}
      className={"flex form-component " + className}
    >
      {stepArray.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div
            className={`w-5 h-5 rounded-full 
              flex items-center justify-center 
              cursor-pointer transition-all duration-300 ease-in-out
              relative ${showLabels === true ? "mb-[1.4375em]" : ""}
              [background-color:var(--form-primary-color)]
              [box-shadow:var(--step-circle-shadow)]`}
            onClick={() => handleStepClick(step)}
          >
            {/* Step Number or Check Mark */}
            <span className="text-[0.875em] font-semibold h-[0.583em] w-[0.583em] rounded-full [background:var(--form-background-color)]"></span>

            {/* Step Label */}
            {showLabels && (
              <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[0.75em] font-normal whitespace-nowrap [color:var(--nav-text-color)]"
              >{step}</div>
            )}
          </div>

          {/* Connecting Line */}
          {index < stepArray.length - 1 && (
            <div
              className={`
                h-[0.5625em] flex-1 transition-colors duration-300 ease-in-out my-[0.34375em] mx-[-0.5625em]
                ${
                step < currentStep ? 
                  "[background-color:var(--form-primary-color)] [box-shadow:var(--form-btn-bg-inset-shadow)]" : 
                  "[background-color:var(--form-button-bg-color)] [box-shadow:var(--form-btn-bg-shadow)]"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepProgress;
