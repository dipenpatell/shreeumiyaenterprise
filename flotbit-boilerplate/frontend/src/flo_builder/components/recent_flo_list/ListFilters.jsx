import { useEffect, useState, useRef } from "react";

import {
  ChevronDown,
  CancleCircleFilled,
} from "../../../assets/icons/svgs";
import { Button } from "../../../common/components/ui/button";


const ListFilters = ({ setIsOpen }) => {
  /* Team Filter */
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teamOptions = [
    { value: 1, label: "Team 1" },
    { value: 2, label: "Team 2" },
    { value: 3, label: "Team 3" },
    { value: 4, label: "Team 4" },
  ];

  /* Flo Filter */
  const [selectedFlo, setSelectedFlo] = useState();
  const floOptions = [
    { value: 1, label: "Flo 1" },
    { value: 2, label: "Flo 2" },
    { value: 3, label: "Flo 3" },
    { value: 4, label: "Flo 4" },
  ];

  /* Tags Filter */
  const [selectedTags, setSelectedTags] = useState([1]);
  const tagsOptions = [
    { value: 1, label: "tag 1" },
    { value: 2, label: "tag 2" },
    { value: 3, label: "tag 3" },
    { value: 4, label: "tag 4" },
  ];

  const clearAllFilters = () => {
    setSelectedFlo(null);
    setSelectedTags(null);
    setSelectedTeam(null);
  };

  const handleApplyFilter = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="w-full
      bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)]
      border border-gray-200 rounded-[0.625em] shadow-lg z-20 p-4"
    >
      <h3 className="text-[1em] font-normal text-[var(--text-color-basic))] mb-[1.5625em]">
        Filters
      </h3>

      {/* Filter Options */}
      <div className="flex-1 flex flex-col w-full gap-[0.9375em]">
        {/* Team Filter */}
        <SelectDropdown
          placeholder={"Select team"}
          initiallySelected={selectedTeam}
          onChange={setSelectedTeam}
          options={teamOptions}
        />

        {/* Flo Filter */}
        <SelectDropdown
          placeholder={"Select Flo"}
          initiallySelected={selectedFlo}
          onChange={setSelectedFlo}
          options={floOptions}
        />

        {/* Tags Filter */}
        <MultiSelectDropdown
          name={"Tag"}
          placeholder={"Select Tags"}
          initiallySelected={selectedTags}
          onChange={setSelectedTags}
          options={tagsOptions}
        />
      </div>

      {/* Filter actions */}
      <div className="flex gap-[1.25em] mt-[1.5625em]">
        <Button
          label={"Clear"}
          className={"flex-1"}
          onclick={() => clearAllFilters()}
        />
        <Button
          label={"Apply"}
          variant="primary"
          className={"flex-1"}
          onclick={() => handleApplyFilter()}
        />
      </div>
    </div>
  );
};

const MultiSelectDropdown = ({
  name,
  placeholder,
  initiallySelected,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    initiallySelected || null
  );

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
    setSelectedOptions(initiallySelected || []);
  }, [initiallySelected]);

  const toggleOption = (value) => {
    onChangeOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((v) => v !== value)
        : [...selectedOptions, value]
    );
  };

  const removeOption = (value) => {
    onChangeOptions(selectedOptions.filter((v) => v !== value));
  };

  const clearAll = () => {
    onChangeOptions([]);
  };

  const onChangeOptions = (value) => {
    setSelectedOptions(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className="w-full p-[0.9375em] rounded-lg bg-[var(--background-color-200)] cursor-pointer hover:border-[var(--background-color-300)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col">
          <span className="text-[0.9375em] mb-[0.3125em] text-[var(--text-color-light)]">
            {name}
          </span>
          <div className="flex items-center justify-between gap-1 flex-1">
            <div className="flex flex-wrap items-center gap-1 flex-1">
              {selectedOptions.length === 0 ? (
                <span className="text-gray-500">{placeholder}</span>
              ) : (
                selectedOptions.map((val, index) => {
                  const opt = options.find((o) => o.value === val);
                  return (
                    <span
                      key={val}
                      className="inline-flex items-center px-[0.625em] py-[0.3125em] bg-[var(--background-color-700)] text-[var(--text-color-900)] text-[0.8125em] rounded-full"
                    >
                      {opt.label}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(val);
                        }}
                        className="ml-1 rounded-full p-0.5 transition-colors"
                      >
                        <CancleCircleFilled height={"1.0625em"} />
                      </button>
                    </span>
                  );
                })
              )}
            </div>
            <ChevronDown
              height={"1.25em"}
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
          {/* Clear All Button */}
          {selectedOptions.length > 0 && (
            <div className="px-3 py-2 border-b border-gray-100">
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Clear All ({selectedOptions.length})
              </button>
            </div>
          )}

          {/* Options */}
          <div className="py-1">
            {options.map(({ value, label }) => (
              <div
                key={value}
                className={`flex items-center px-3 py-2 cursor-pointer transition-colors text-[0.8125em] ${
                  selectedOptions.includes(value)
                    ? "bg-[var(--background-color-700)] text-[var(--text-color-900)]"
                    : "hover:bg-[var(--background-color-50)] hover:text-gray-700"
                }`}
                onClick={() => toggleOption(value)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(value)}
                  onChange={() => {}} // Handled by parent onClick
                  className="mr-3 rounded border-[var(--background-color-700)] focus:ring-[var(--text-color-900)]"
                />
                <span
                  className={`${
                    selectedOptions.includes(value) ? "font-medium" : ""
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SelectDropdown = ({
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

  const toggleOption = (value) => {
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
    setIsOpen(false);
  };

  const selectedLabel = (val) => options.find((option) => option.value === val);

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

export default ListFilters;
