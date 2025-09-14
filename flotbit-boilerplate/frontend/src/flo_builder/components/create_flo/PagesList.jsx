import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

import DraggableList from "./DraggableList";
import { generateRandomId } from "../../../common/services/GenrateRandomId";

const PagesList = ({ pages, setPages, setCurrentPage }) => {
  const addPage = useCallback(
    (text) => {
      if (text.trim()) {

        let title = text.trim();
        let newPagesCount = 1;

        let id = generateRandomId();
        let findPage = pages.find((p) => p.id === id || p.title === title);

        if (findPage) {
          if (title === "New Page") {
            while (pages.find((p) => p.id === id || p.title === title)) {
              newPagesCount += 1;
              title = "New Page " + newPagesCount;
            }
          } else {
            alert("Page already exist!");
            return;
          }
        }

        const newItem = {
          id: id,
          title: title,
          order: pages.length + 1,
          sections: [],
          actions: [],
        };
        setPages([...pages, newItem]);
      }
    },
    [setPages, pages]
  );
  const removePage = useCallback(
    (id) => {
      setPages(pages.filter((item) => item.id !== id));
    },
    [setPages, pages]
  );

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden
        rounded-2xl p-[1.25em] m-[1.5em]
        bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)]"
    >
      <div className="flex items-center justify-between mb-[0.9375em]">
        <div className="text-[1em] font-normal text-[var(--theme-text-color)]">
          Pages
        </div>
        <Plus className="w-4 h-4 cursor-point" onClick={() => addPage("New Page")} />
      </div>
      <DraggableList
        items={pages}
        setItems={setPages}
        setSelectedItem={setCurrentPage}
        removeItem={removePage}
        addItems={addPage}
        isItemsEditable={true}
      />
    </div>
  );
};

export default PagesList;
