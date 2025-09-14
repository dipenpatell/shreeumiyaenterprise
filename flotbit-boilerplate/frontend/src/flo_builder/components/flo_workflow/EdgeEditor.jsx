import { useState } from "react";

const EdgeEditor = ({ rule, onSave, onClose }) => {
  const [form, setForm] = useState(rule);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Condition</h3>

        <div className="space-y-3">
          <input
            name="fieldId"
            value={form.fieldId}
            onChange={handleChange}
            placeholder="Field ID"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="operator"
            value={form.operator}
            onChange={handleChange}
            placeholder="Operator (equals, not equals, etc.)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder="Value"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeEditor;