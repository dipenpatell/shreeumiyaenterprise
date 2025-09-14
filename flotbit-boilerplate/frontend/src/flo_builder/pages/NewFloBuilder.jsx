import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PagesList from "../components/create_flo/PagesList";
import SectionsList from "../components/create_flo/SectionsList";
import FieldsList from "../components/create_flo/FieldsList";
import FieldConfig from "../components/create_flo/FieldConfig";
import FloPagePreview from "../components/flo_workflow/FloPagePreview";

const NewFloBuilder = () => {
  const { floBuilder } = useSelector((state) => state);

  const [floConfig, setFloConfig] = useState({});
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentField, setCurrentField] = useState(null);
  
  useEffect(() => {
    setFloConfig(floBuilder.build || {});
  }, [floBuilder.build]);

  useEffect(() => {
    setPages(floConfig.pages || []);
  }, [floConfig]);

  // Sections
  const setsections = useCallback(
    (sections) => {
      if (!currentPage) return;

      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === currentPage
            ? {
                ...page,
                sections: updateOrder(sections),
              }
            : page
        )
      );
    },
    [currentPage]
  );
  const getCurrentSections = useCallback(
    (id) =>
      pages.find((item) => item.id === id)
        ? pages.find((item) => item.id === id).sections
        : [],
    [pages]
  );

  // Fields
  const setFields = useCallback(
    (fields) => {
      if (!currentSection || !currentPage) return;

      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === currentPage
            ? {
                ...page,
                sections: page.sections.map((section) =>
                  section.id === currentSection
                    ? {
                        ...section,
                        fields: fields,
                      }
                    : section
                ),
              }
            : page
        )
      );
    },
    [currentSection, currentPage]
  );
  const getCurrentFields = useCallback(
    (items, id) =>
      items.find((item) => item.id === id)
        ? items.find((item) => item.id === id).fields
        : [],
    []
  );

  const setField = useCallback(
    (newField) => {
      if (!currentSection || !currentPage || !currentField) return;

      setPages((prevPages) =>
        prevPages.map((page) =>
          page.id === currentPage
            ? {
                ...page,
                sections: page.sections.map((section) =>
                  section.id === currentSection
                    ? {
                        ...section,
                        fields: section.fields.map((field) =>
                          field.id === currentField ? newField : field
                        ),
                      }
                    : section
                ),
              }
            : page
        )
      );
    },
    [currentSection, currentPage, currentField]
  );
  const getCurrentField = useCallback(
    (items, id) =>
      items.find((item) => item.id === id)
        ? items.find((item) => item.id === id)
        : {},
    []
  );

  const updateOrder = useCallback((items) => {
    return items.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
  }, []);

  return (
    <div className="flex-1 flex p-[16px] bg-[var(--background-color-50)]">
      <div className="flex flex-col w-[350px] overflow-hidden">
        <FieldsList
          fields={getCurrentFields(
            getCurrentSections(currentPage),
            currentSection
          )}
          setFields={setFields}
          setCurrentField={setCurrentField}
        />
        <FieldConfig
          field={getCurrentField(
            getCurrentFields(getCurrentSections(currentPage), currentSection),
            currentField
          )}
          setField={setField}
        />
      </div>

      <FloPagePreview
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getCurrentSections={getCurrentSections}
        setFields={setFields}
        setCurrentSection={setCurrentSection}
        setCurrentField={setCurrentField}
        currentField={currentField}
      />

      <div className="flex flex-col w-[350px] overflow-hidden">
        <PagesList
          pages={pages}
          setPages={setPages}
          setCurrentPage={setCurrentPage}
        />
        <SectionsList
          sections={getCurrentSections(currentPage)}
          setsections={setsections}
          setCurrentSection={setCurrentSection}
        />
      </div>
    </div>
  );
};

export default NewFloBuilder;
