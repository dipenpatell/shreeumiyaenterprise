import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../common/components/Navbar";
import { Breadcrumbs } from "../../common/components/breadcrumbs/Breadcrumbs";
import FormProgressBar from "./FormProgressBar";
import { setCurrentPage } from "../data/floSlice";
import { BackArrow, InfoOutline } from "../../assets/icons/svgs";

const FormLayout = (props) => {
  const dispatch = useDispatch();
  const flo = useSelector((state) => state.flo);

  const [currentCompo, setcurrentCompo] = useState("intro");
  const [currentTheme, setCurrentTheme] = useState("");

  const themes = {
    default: "", // default
    red: "theme-red",
    purple: "theme-purple",
    green: "theme-green",
    blue: "theme-blue",
  };

  useEffect(() => {
    if (flo.floTheme && themes[flo.floTheme]) {
      setCurrentTheme(themes[flo.floTheme]); // Fallback to default
    } else if (props.floTheme && themes[props.floTheme]) {
      setCurrentTheme(themes[props.floTheme]);
    }
  }, [props.floTheme, flo.floTheme]);

  const handleOnChangePage = (value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <div
      className={`flo-wrapper flex w-full flex-col overflow-hidden relative transition-all duration-300 ease-in-out [background:var(--form-main-background-color)!important] [color:var(--form-primary-color)!important]
     ${currentTheme}`}
    >
      <Navbar
        leftNav={{
          icon: (
            <BackArrow height={"17px"} fill={"var(--form-primary-color)"} />
          ),
        }}
        navText={"Custer Feedback"}
        rightNav={{
          icon: (
            <InfoOutline height={"30px"} fill={"var(--form-primary-color)"} />
          ),
        }}
      />
      <Breadcrumbs />
      <div
        className="flex-1 flex flex-col items-center gap-[1.875em]
          px-[1.875em] py-[1.4em]
          m-auto
          overflow-hidden max-w-[62.5em] w-full 
          max-md:px-[1.5em]"
      >
        {props.children}
      </div>
      <FormProgressBar
        currentStep={flo.currentPage}
        setCurrentStep={handleOnChangePage}
        totalSteps={flo.totalPages}
      />
      {/* <div
        className="flex-1 flex flex-col items-center gap-[1.875em]
          m-auto
          overflow-hidden max-w-[62.5em] w-full"
      >
        <FormIntro />
      </div> */}
    </div>
  );
};

{
  /* Next button for intro page (Pending devlopment) */
}
{
  /* <div className="flex ml-auto w-full max-md:mt-[1.875em] hidden">
  <Button
    variant="primary"
    label={
      <span className="flex text-[16px] justify-center items-center gap-2">
        <span>Next</span>
        <RightNextArrow height={"0.75em"} />
      </span>
    }
    className={
      "min-w-[100px] ml-auto [background:var(--form-btn-bg)!important] [box-shadow:var(--form-inset-shadow)!important] max-md:m-0 max-md:w-full"
    }
    onclick={() => null}
  />
</div> */
}

export default FormLayout;
