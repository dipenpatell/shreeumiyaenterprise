import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const DropdownSelection = ({
  name,
  placeholder,
  initiallySelected = null,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initiallySelected);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedOption(initiallySelected);
  }, [initiallySelected]);

  const toggleOption = useCallback(
    (value) => {
      setSelectedOption(value);
      if (onChange && value) {
        onChange(value);
      }
      setIsOpen(false);
    },
    [onChange]
  );

  const selectedLabel = useCallback(
    (val) => options.find((option) => option.value === val),
    [options]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className="w-full p-[0.9375em] rounded-lg bg-[var(--background-color-200)] cursor-pointer hover:border-[var(--background-color-300)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col">
          {name && (
            <span className="text-[0.9375em] mb-[0.3125em] text-[var(--text-color-light)]">
              {name}
            </span>
          )}
          <div className="flex items-center justify-between gap-1 flex-1">
            <div className="flex-1">
              {selectedOption && selectedLabel(selectedOption).label ? (
                <span
                  key={selectedLabel(selectedOption).value}
                  className="text-[var(--theme-text-color)] text-[0.8125em] rounded-full"
                >
                  {selectedLabel(selectedOption).label}
                </span>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--background-color-200)] border border-[var(--background-color-300)] rounded-lg max-h-60 overflow-y-auto">
          {/* Options */}
          <div className="py-1">
            {[{ value: null, label: placeholder }, ...options].map(
              ({ value, label }) => (
                <div
                  key={value}
                  className={`flex items-center px-3 py-2 cursor-pointer transition-colors text-[0.8125em] ${
                    selectedOption === value
                      ? "bg-[var(--background-color-700)] text-[var(--text-color-900)]"
                      : "hover:bg-[var(--background-color-50)] hover:text-gray-700"
                  }`}
                  onClick={() => toggleOption(value)}
                >
                  <span
                    className={`${
                      selectedOption === value ? "font-medium" : ""
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelection;
