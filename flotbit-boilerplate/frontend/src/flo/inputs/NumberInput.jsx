import React, { useState, useRef, useEffect, useCallback } from "react";

const NumberInput = ({
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange = null,
  style = {},
  className = "",
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const inputRef = useRef(null);

  const formatNumber = (num) => num.toString().padStart(2, "0");

    const updateValue = useCallback(
    (newValue) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      setValue(clampedValue);
      if (onChange) {
        onChange(clampedValue);
      }
    },
    [min, max, onChange] // depends on props
  );

  const handleInputChange = useCallback(
    (e) => {
      let newValue = parseInt(e.target.value.replace(/^0+/, "")) || min;
      updateValue(newValue);
    },
    [updateValue, min]
  );

  const decrease = useCallback(() => {
    updateValue(value - 1);
  }, [value, updateValue]);

  const increase = useCallback(() => {
    updateValue(value + 1);
  }, [value, updateValue]);

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
        type="number"
        className="form-number-input-display flex-1 text-left text-[1.125em] font-normal text-[var(--form-primary-color)] r-[1.038125em] pt-[1.038125em] pb-[1.038125em] bg-transparent border-none outline-none h-full box-border appearance-none"
        value={formatNumber(value)}
        min={min}
        max={max}
        onChange={handleInputChange}
      />

      <button
        className="form-component-button 
          w-[2.75em] h-[2.75em] border-none text-[1.25em] font-light 
          cursor-pointer transition-all duration-150 ease-in-out 
          flex items-center justify-center select-none 
          rounded-full my-[0.625em] ml-auto mr-[0.9375em]"
        onClick={decrease}
        aria-label="Decrease value"
      >
        −
      </button>

      <button
        className="form-component-button 
          w-[2.75em] h-[2.75em] border-none text-[1.25em] font-light 
          cursor-pointer transition-all duration-150 ease-in-out 
          flex items-center justify-center select-none 
          rounded-full my-[0.625em]"
        onClick={increase}
        aria-label="Increase value"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
