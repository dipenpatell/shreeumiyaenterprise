import React, { useCallback, useEffect, useState } from "react";

const DetailedMultiChoice = ({
  options = [],
  onChange,
  defaultValue = [],
  style = {},
  className = "",
}) => {
  const [selectedOptions, setSelectedOptions] = useState([1]);

  useEffect(() => {
    if (Array.isArray(defaultValue)) {
      setSelectedOptions(defaultValue);
    } else {
      setSelectedOptions([defaultValue]);
    }
  }, [defaultValue]);

  const handleChoiceToggle = useCallback(
    (choiceId) => {
      let newSelected;

      if (selectedOptions.includes(choiceId)) {
        newSelected = selectedOptions.filter((id) => id !== choiceId);
      } else {
        newSelected = [...selectedOptions, choiceId];
      }

      setSelectedOptions(newSelected);
      if (onChange) {
        onChange(newSelected);
      }
    },
    [selectedOptions, onChange]
  );

  const isSelected = useCallback(
    (choiceId) => selectedOptions.includes(choiceId),
    [selectedOptions]
  );

  return (
    <div
      style={{
        ...style,
      }}
      className={"form-component grid grid-cols-2 gap-[1.875em] " + className}
    >
      {options.map((choice, index) => (
        <div
          key={choice.value}
          className="flex items-center justify-center py-[0.864375em] bg-[var(--form-section-bg)] [box-shadow:var(--form-section-outset-shadow)] min-h-[198px] relative cursor-pointer transition-all duration-200 rounded-[0.625em] hover:opacity-90"
          onClick={() => handleChoiceToggle(choice.value)}
        >
          {isSelected(choice.value) && (
            <YesIcon
              className={"absolute -top-3 left-1/2 transform -translate-x-1/2"}
            />
          )}
          <span className="text-[1em] font-semibold text-[var(--form-primary-color)] m-0">
            {choice.label || choice.text || `Choice ${index + 1}`}
          </span>
        </div>
      ))}
    </div>
  );
};

const YesIcon = ({ className }) => (
  <div
    className={`w-[1.75em] h-[1.75em] flex items-center justify-center rounded-[0.5em] border-none cursor-pointer
                 bg-[var(--form-primary-color)] shadow-[inset_1.91px_1.91px_3.82px_0px_#000000] ${className}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="0.796875em"
      viewBox="0 0 19 14"
      fill="none"
    >
      <path
        d="M6.25039 11.0033L2.6534 7.45455C2.55934 7.36062 2.44732 7.28605 2.32383 7.23515C2.20034 7.18425 2.06784 7.15804 1.934 7.15804C1.80017 7.15804 1.66767 7.18425 1.54418 7.23515C1.42069 7.28605 1.30866 7.36062 1.21461 7.45455C1.1194 7.54735 1.04381 7.65787 0.992218 7.7797C0.940628 7.90153 0.914062 8.03226 0.914062 8.1643C0.914062 8.29634 0.940628 8.42706 0.992218 8.54889C1.04381 8.67073 1.1194 8.78125 1.21461 8.87404L5.52071 13.1224C5.92152 13.5178 6.56898 13.5178 6.96979 13.1224L17.8635 2.38495C17.9587 2.29215 18.0343 2.18163 18.0859 2.0598C18.1375 1.93796 18.1641 1.80724 18.1641 1.6752C18.1641 1.54316 18.1375 1.41244 18.0859 1.2906C18.0343 1.16877 17.9587 1.05825 17.8635 0.965456C17.7695 0.871526 17.6574 0.796951 17.5339 0.746052C17.4105 0.695154 17.278 0.668945 17.1441 0.668945C17.0103 0.668945 16.8778 0.695154 16.7543 0.746052C16.6308 0.796951 16.5188 0.871526 16.4247 0.965456L6.25039 11.0033Z"
        fill={"var(--form-button-bg)"}
      />
    </svg>
  </div>
);

export default DetailedMultiChoice;
