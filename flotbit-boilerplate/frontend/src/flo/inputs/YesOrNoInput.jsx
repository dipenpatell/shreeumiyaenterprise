import { useEffect, useState } from "react";

const YesOrNoInput = ({
  defaultValue = null,
  onChange = null,
  style = {},
  className = "",
}) => {
  let options = [
    {
      value: true,
      label: "YES",
      icon: <YesIcon />,
    },
    {
      value: false,
      label: "NO",
      icon: <CancleIcon />,
    },
  ];

  const [selectedValue, setselectedValue] = useState(null);

  useEffect(() => {
    if (defaultValue !== null) {
      setselectedValue(Boolean(defaultValue));
    }
  }, [defaultValue]);

  const handleStarClick = (value) => {
    setselectedValue(Boolean(value));
    if (onChange) {
      onChange?.(Boolean(value));
    }
  };

  return (
    <div
      style={{
        ...style,
      }}
      className={"form-component flex gap-[1.5625em] " + className}
    >
      {options.map((e, index) => {
        return (
          <button
            key={e.value.toString()}
            onClick={() => handleStarClick(e.value)}
            className={`shrink-0 flex gap-[0.9375em] items-center justify-center flex-1 form-action-button text-[1.125em] font-semibold cursor-pointer transition-all duration-200 rounded-[0.625em] px-[1.25em] py-[0.59375em] border-none
              ${
                selectedValue === e.value
                  ? " [background:var(--form-primary-color)!important] [color:var(--form-button-bg)!important] [box-shadow:2px_4px_4px_0px_#00000040_inset!important]"
                  : ""
              }
            `}
          >
            <span className="text-[0.875em]">{e.label}</span>

            <div
              className={`w-[1.75em] h-[1.75em] flex items-center justify-center rounded-[0.5em] border-none cursor-pointer
                 bg-[var(--form-primary-color)]
                ${
                  selectedValue === e.value
                    ? ""
                    : " shadow-[inset_1.91px_1.91px_3.82px_0px_#000000]"
                }`}
            >
              {e.icon}
            </div>
          </button>
        );
      })}
    </div>
  );
};

const YesIcon = () => (
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
);

const CancleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      d="M1.51172 15.6532L8.50239 8.66254L15.4931 15.6532M15.4931 1.67188L8.50105 8.66254L1.51172 1.67188"
      stroke={"var(--form-button-bg)"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default YesOrNoInput;
