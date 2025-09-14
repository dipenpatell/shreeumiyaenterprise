import { useEffect, useRef, useState } from "react";

import Navbar from "../../common/components/Navbar";
import {
  AIicon,
  BackArrow,
  FileUpload,
  FormFluetColor,
  PlusCreateNew,
  TemplateIcon,
} from "../../assets/icons/svgs";
import { Button } from "../../common/components/ui/button";
import RecentFloList from "../components/recent_flo_list/RecentFloList";
import { useNavigate } from "react-router-dom";

const FloBuilder = ({}) => {
  const navigate = useNavigate();
  const FlowCreationPopupRef = useRef(null);

  const [isOpenFlowCreationPopup, setIsOpenFlowCreationPopup] = useState(false);
  const floCreationOptions = [
    {
      id: 1,
      title: "Create with help of AI",
      icon: <AIicon />,
      bgColor: "bg-blue-500",
      iconBg: "bg-blue-600",
    },
    {
      id: 2,
      title: "Select from template",
      icon: <TemplateIcon />,
      bgColor: "bg-green-500",
      iconBg: "bg-green-600",
    },
    {
      id: 3,
      title: "Manually Create",
      icon: <FormFluetColor />,
      bgColor: "bg-blue-400",
      iconBg: "bg-blue-500",
    },
    {
      id: 4,
      title: "Import questions",
      icon: <FileUpload />,
      bgColor: "bg-orange-500",
      iconBg: "bg-orange-600",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        FlowCreationPopupRef.current &&
        !FlowCreationPopupRef.current.contains(event.target)
      ) {
        setIsOpenFlowCreationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreationOptSelected = (option) => {
    console.log(`Selected: `,option);

    if(option.id == 3) {
      navigate("/flo-builder/create");
    }

  };

  return (
    <div
      className={`flex w-full flex-col overflow-hidden relative transition-all duration-300 ease-in-out`}
    >
      <Navbar
        leftNav={{
          icon: (
            <BackArrow height={"1.0625em "} fill={"var(--theme-text-color)"} />
          ),
        }}
        navText={"Flo Builder"}
      />

      <div className="flex-1 flex w-full flex-col overflow-hidden px-[1.5em]">
        {/* Flo creation button */}
        <Button
          variant="primary"
          label={<NewFloButtonLabel />}
          className={"w-full mb-[1.875em]"}
          onclick={() => setIsOpenFlowCreationPopup(true)}
          type="submit"
        />

        {/* Flow List */}
        <RecentFloList />
      </div>

      {/* Flow Creation option Pop up */}
      {isOpenFlowCreationPopup && (
        <FlowCreationPopup
          ref={FlowCreationPopupRef}
          onChange={handleCreationOptSelected}
          options={floCreationOptions}
        />
      )}
    </div>
  );
};

const NewFloButtonLabel = () => {
  return (
    <div className="flex items-center justify-center gap-[0.625em]">
      <PlusCreateNew height={"1.4375em"} />
      <span>New Flo</span>
    </div>
  );
};

const FlowCreationPopup = ({ onChange, ref, options }) => {

  console.log("RENDER FlowCreationPopup");

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#FFFFFFD4] z-50 
        flex items-center justify-center flex-col 
        px-6 py-8"
    >
      {/* Content */}
      <div
        ref={ref}
        className="flex-1 flex flex-col gap-[1.25em] items-center justify-center 
          p-[1.6875em] 
          w-full max-w-[15.625em] overflow-y-auto"
      >
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className="w-full min-h-[9.375em] bg-[var(--background-color-300)] rounded-2xl p-[1.25em] [box-shadow:var(--outset-shadow-200)] transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-[3.5em] flex items-center justify-center`}>
                {option.icon}
              </div>
              <h3 className="text-[var(--theme-text-color)] font-semibold text-[0.9375em]">
                {option.title}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloBuilder;
