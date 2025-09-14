import React, { useState, useRef, useEffect } from "react";

const TextInput = ({
  defaultValue = "",
  placeholder="",
  onChange = null,
  style = {},
  className = "",
}) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);
  
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e) => {
    // let newValue = parseInt(e.target.value.replace(/^0+/, "")) || min;
    const clampedValue = e.target.value;
    setValue(clampedValue);
    if (onChange) {
      onChange(clampedValue);
    }
  };

  return (
    <div
      style={{
        ...style,
      }}
      className={
        "form-component flex items-center border-b border-[var(--form-primary-color)] " +
        className
      }
    >
      <input
        ref={inputRef}
        type="text"
        className="form-number-input-display flex-1 text-left text-[1.125em] font-normal text-[var(--form-primary-color)] r-[1.038125em] pt-[1.038125em] pb-[1.038125em] bg-transparent border-none outline-none h-full box-border appearance-none"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
