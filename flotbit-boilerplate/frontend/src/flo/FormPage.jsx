import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormLayout from "./FormLayout/FormLayout";
import FieldsController from "./inputs/FieldsController";
import { setIsVisible } from "../common/layout/layoutSlice";

// Datas
import form_data from "./data/example_form_builder.json";
import { setCurrentPage, setFloTheme, setTotalPages } from "./data/floSlice";

const FormPage = ({}) => {
  const dispatch = useDispatch();
  const flo = useSelector((state) => state.flo);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    dispatch(setIsVisible(false));
  }, []);

  useEffect(() => {
    console.log(form_data);

    dispatch(setTotalPages(form_data.pages.length));
    dispatch(setCurrentPage(0));
    dispatch(setFloTheme(form_data.layout_theme));

  }, [dispatch]);

  const handleFieldChange = (pageIndex, fieldIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [pageIndex]: {
        ...prev[pageIndex],
        [fieldIndex]: value, // save response of field
      },
    }));
  };

  return (
    <FormLayout floTheme={"red"}>
      {Boolean("pages" in form_data && flo.currentPage in form_data.pages) && (
        <div className="component-section fullscreen-section">
          <div className="component-wrapper overflow-auto">
            {form_data.pages[flo.currentPage].fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <div className="component-title">{field.title}</div>
                <div className="component-description">{field.discription}</div>
                {/* <FieldsController
                  field={field}
                  onChange={(value) =>
                    handleFieldChange(flo.currentPage, fieldIndex, value)
                  }
                /> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </FormLayout>
  );
};

export default FormPage;
