import { Plus } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DraggableList from "./DraggableList";
import { useSelector } from "react-redux";
import { generateRandomId } from "../../../common/services/GenrateRandomId";
import SearchableDropdown from "../../../common/components/ui/DropdownSelector";
import SelectorTab from "../../../common/components/ui/SelectorTab";

const FieldsList = ({ fields, setFields, setCurrentField }) => {
  const { floBuilder } = useSelector((state) => state);

  const addFieldButton = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addFieldButton.current &&
        !addFieldButton.current.contains(event.target)
      ) {
        // setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFieldConfig = useCallback(
    (type) => floBuilder.fields.find((e) => e.type === type),
    [floBuilder.fields]
  );

  const addField = useCallback(
    (value) => {
      const id = generateRandomId();

      console.log("addField: ", value);

      const newItem = {
        ...getFieldConfig(value),
        label: {
          value: "",
          placeholder: "Enter Title",
          required: true,
        },
        description: {
          value: "",
          placeholder: "Description (optional)",
          required: false,
        },
        id: id,
      };
      setFields([...fields, newItem]);
    },
    [fields]
  );
  const removeSection = useCallback(
    (id) => {
      setFields(fields.filter((item) => item.id !== id));
    },
    [fields]
  );

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    addField(option);
  };

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden
        rounded-2xl p-[1.25em] m-[1.5em]
        bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)]"
    >
      <div className="flex items-center justify-between mb-[0.9375em] relative">
        <div className="text-[1em] font-normal text-[var(--theme-text-color)]">
          Fields
        </div>

        {/* Add new Field with dropdown selector */}
        <Plus
          className="w-4 h-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <SelectorTab
            options={floBuilder.fields.map((f) => {
              return {
                value: f.type,
                label: f.title,
              };
            })}
            name={"Field"}
            onChange={handleOptionSelect}
            position="left"
          />
        )}
      </div>
      <DraggableList
        items={fields}
        setItems={setFields}
        setSelectedItem={setCurrentField}
        addItems={addField}
        removeItem={removeSection}
      />
    </div>
  );
};

export default FieldsList;
