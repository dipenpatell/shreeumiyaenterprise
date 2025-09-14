import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import SelectorTab from "./SelectorTab";

export default function SearchableDropdown({
  options = [],
  onChange = null,
  defaultValue = "",
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  const getSelectedOption = (value) =>
    options.find((o) => o.value === value)?.label || "none";

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="w-full bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)] rounded-[0.9375em] px-[1.25em] py-[0.9375em] flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-orange-400 rounded-full"></div>
          </div>
          <span className="text-gray-700 font-medium">
            {getSelectedOption(selectedOption)}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <SelectorTab
            options={options}
            name={name}
            placeholder={placeholder}
            onChange={handleOptionSelect}
        />
      )}
    </div>
  );
}
