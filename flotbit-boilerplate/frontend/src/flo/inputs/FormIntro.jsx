import React from "react";

const FormIntro = ({}) => {
  return (
    <div className="
      flex-1 flex flex-col items-center gap-[1.875em]
      overflow-auto w-full
      px-[1.875em] py-[1.4em]
      m-auto
      max-md:px-[1.5em]
    ">
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
        </div>
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
        </div>
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
        </div>
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
        </div>
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
        </div>
        <div className="component-section">
          <div className="component-wrapper">
            <div className="component-title">Section Title</div>
            <div className="component-description">Section Description</div>
          </div>
          <div className="component-wrapper">
            <div className="component-title">
              Section Title(Documents with preview)
            </div>
            <div className="documents-wrapper">
              <div className="document-preview"></div>
              <div className="document-preview"></div>
              <div className="document-preview"></div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FormIntro;
