import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import DraggableList from "./DraggableList";
import { generateRandomId } from "../../../common/services/GenrateRandomId";

const SectionsList = ({ sections, setsections, setCurrentSection }) => {
  const addSection = useCallback(
    (text) => {
      if (text.trim()) {
        const id = generateRandomId();
        let title = text.trim();
        let newCount = 1;

        const findSection = sections.find((p) => p.id === id || p.title === title);

        if (findSection) {
          if (title === "New Section") {
            while (sections.find((p) => p.title === title)) {
              newCount += 1;
              title = "New Section " + newCount;
            }
          } else {
            alert("Section already exist!");
            return;
          }
        }

        const newItem = {
          id: id,
          title: title,
          order: sections.length + 1,
          fields: [],
          actions: [],
        };
        setsections([...sections, newItem]);
      }
    },
    [sections, setsections]
  );

  const removeSection = useCallback(
    (id) => {
      setsections(sections.filter((item) => item.id !== id));
    },
    [setsections, sections]
  );

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden
        rounded-2xl p-[1.25em] m-[1.5em]
        bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)]"
    >
      <div className="flex items-center justify-between mb-[0.9375em]">
        <div className="text-[1em] font-normal text-[var(--theme-text-color)]">
          Sections
        </div>
        <Plus className="w-4 h-4 cursor-point" onClick={() => addSection("New Section")} />
      </div>
      <DraggableList
        items={sections}
        setItems={setsections}
        setSelectedItem={setCurrentSection}
        removeItem={removeSection}
        addItems={addSection}
        isItemsEditable={true}
      />
    </div>
  );
};

export default SectionsList;
