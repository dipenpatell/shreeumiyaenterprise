import { useState } from "react";
import FieldsController from "../../../flo/inputs/FieldsController";
import FormProgressBar from "../../../flo/FormLayout/FormProgressBar";

const FloPagePreview = ({
  pages,
  currentPage,
  setCurrentPage,
  getCurrentSections,
  setCurrentSection,
  setCurrentField,
  currentField,
}) => {

  const getCurrentPageIndex = () => {
    const index = pages.findIndex((page) => page.id === currentPage);
    return index;
  };

  const setCurrentStep = (index) => setCurrentPage(pages[index]?.id || -1);

  return (
    <div className="flex-1 flex items-center flex-col py-[5em] overflow-hidden">
      <div className="flex-1 flex items-center overflow-auto px-[5em] flex-col max-w-[900px]">
        {getCurrentSections(currentPage).map((section) =>
          section.fields.length > 0 ? (
            <div
              className="component-section m-[24px]"
              style={{ padding: "1em" }}
            >
              <div className="component-wrapper overflow-auto">
                {section.fields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={`form-field ${
                      currentField === field.id ? "active-field" : ""
                    }`}
                    style={{ padding: "0.875em", borderRadius: "1em" }}
                    onClick={() => {
                      setCurrentSection(section.id);
                      setCurrentField(field.id);
                    }}
                  >
                    <div className="component-title">
                      {field?.label.value || "...?"}
                    </div>
                    <div className="component-description">
                      {field?.description.value}
                    </div>
                    <FieldsController field={field} onChange={null} />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* <FormProgressBar
        currentStep={getCurrentPageIndex()}
        setCurrentStep={setCurrentStep}
        totalSteps={pages.length}
        style={{marginBottom: 0}}
      /> */}
    </div>
  );
};

export default FloPagePreview;
