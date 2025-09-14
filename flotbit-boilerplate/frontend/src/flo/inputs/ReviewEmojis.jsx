import { useCallback, useEffect, useState } from "react";

const ReviewEmojis = ({
  defaultValue = null,
  onChange = null,
  style = {},
  className = "",
}) => {
  const [selectedChoices, setSelectedChoices] = useState(null);
  const choices = [
    { value: 1, icon: "😞", label: "Terrible" },
    { value: 2, icon: "😟", label: "Bad" },
    { value: 3, icon: "🙂", label: "Ok" },
    { value: 4, icon: "😃", label: "Good" },
    { value: 5, icon: "😍", label: "Amazing" },
  ];

  useEffect(() => {
    if (choices.some((c) => c.value === defaultValue)) {
      setSelectedChoices(defaultValue);
    }
  }, [defaultValue, choices]);

  const handleStarClick = useCallback(
    (choice) => {
      const newValue = selectedChoices === choice ? null : choice;
      setSelectedChoices(newValue);
      if (onChange) onChange(newValue);
    },
    [onChange, selectedChoices]
  );

  return (
    <div
      style={{
        ...style,
      }}
      className={"form-component flex gap-[1.5625em] " + className}
    >
      {choices.map((choice, index) => {
        return (
          <button
            key={index}
            onClick={() => handleStarClick(choice.value)}
            className={`shrink-0 flex flex-col items-center justify-center text-[var(--form-primary-color)]  transition-transform duration-100 ease-in-out`}
          >
            <span
              className={`leading-1 text-[1.875em] mb-[0.8125em] hover:scale-120 ${
                selectedChoices === choice.value ? "scale-120" : ""
              }`}
            >
              {choice.icon}
            </span>
            <span className="text-[0.875em]">{choice.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReviewEmojis;
