import { useCallback, useEffect, useState } from "react";
import { GripVertical, X, Plus } from "lucide-react";
import DropdownSelection from "../DropdownSelection";

const DraggableList = ({
  items,
  setItems,
  setSelectedItem,
  addItems,
  removeItem,
  isItemsEditable=false
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [newItemText, setNewItemText] = useState("");

  // at Drag start
  const handleDragStart = useCallback((e, item, index) => {
    // console.log("handleDragStart");
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
    // Add visual feedback
    e.target.style.opacity = "0.5";
  }, []);

  // at Drag end
  const handleDragEnd = useCallback((e) => {
    console.log("handleDragEnd");
    e.target.style.opacity = "1";
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  // drag over any section
  const handleDragOver = useCallback((e, index) => {
    console.log("handleDragOver", index);
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }, []);

  // drag leave from any section
  const handleDragLeave = useCallback((e, index) => {
    console.log("handleDragLeave", index);
    setDragOverIndex(null);
  }, []);

  // drag drop on any section
  const handleDrop = useCallback(
    (e, targetIndex) => {
      // console.log("handleDrop");
      e.preventDefault();

      if (!draggedItem || draggedItem.index === targetIndex) {
        return;
      }

      const newItems = [...items];
      const draggedElement = newItems[draggedItem.index];

      // Remove dragged item from original position
      newItems.splice(draggedItem.index, 1);

      // Insert at new position
      const insertIndex =
        draggedItem.index < targetIndex ? targetIndex - 1 : targetIndex;
      newItems.splice(insertIndex, 0, draggedElement);

      setItems(newItems);
      setDragOverIndex(null);
    },
    [draggedItem, items, setItems]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        addItems(newItemText);
        setNewItemText("");
      }
    },
    [addItems, newItemText]
  );

  return (
    <div className="flex-1 overflow-auto">
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No items yet. Add some above!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onClick={() => setSelectedItem(item.id)}
              onDragStart={(e) => handleDragStart(e, item, index)}
              onDragEnd={(e) => handleDragEnd(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={(e) => handleDragLeave(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`
              flex items-center p-3 rounded-lg cursor-move transition-all duration-200 shadow-lg
              bg-blue-100 mx-[10px] mb-[15px]
              ${
                dragOverIndex === index
                  ? "ring-2 ring-blue-400 ring-opacity-60"
                  : ""
              }
              hover:shadow-md hover:scale-[1.02]
              active:scale-95
            `}
            >
              <GripVertical
                className="text-gray-400 mr-3 flex-shrink-0"
                size={20}
              />

              {isItemsEditable ? (
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    // Update the item title
                    const updatedItems = items.map((i) =>
                      i.id === item.id ? { ...i, title: e.target.value } : i
                    );
                    setItems(updatedItems); // Assuming you have a setItems function
                  }}
                  onBlur={(e) => {
                    // Optional: Handle blur event if needed
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the div's onClick
                  }}
                  className="flex-1 text-gray-800 font-medium bg-transparent border-none outline-none focus:outline-none focus:border-b focus:border-blue-300 p-0 m-0 min-w-0"
                  autoFocus={false}
                />
              ) : (
                <span className="flex-1 text-gray-800 font-medium">
                  {item.title}
                </span>
              )}

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 transition-colors ml-2 p-1"
                title="Remove item"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraggableList;
