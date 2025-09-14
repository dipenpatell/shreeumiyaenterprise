import { useState, useRef } from "react";
import { Search } from "lucide-react";

const SelectorTab = ({
  options = [],
  name = "",
  placeholder = "",
  onChange = null,
  position="left",
  className = "",
  style = {},
}) => {
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option) => {
    setSearchTerm("");
    onChange?.(option);
  };

  return (
    <div
      style={{ ...style }}
      className={`absolute top-full ${position === "left" ? "left-0": position === "right" ? "right-0": "left-0"} mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-10 overflow-hidden ${className}`}
    >
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={`Search ${name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
          />
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          [
            { value: "", label: placeholder || `Select ${name}` },
            ...filteredOptions,
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 text-gray-700`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-gray-500">
            No options found
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectorTab;
