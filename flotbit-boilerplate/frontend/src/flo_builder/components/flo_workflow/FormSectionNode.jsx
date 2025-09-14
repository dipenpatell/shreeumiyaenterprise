import React from "react";
import { Handle, Position } from "reactflow";
import { Settings, Trash2, Play, FileText } from "lucide-react";

export const FormSectionNode = ({ data, selected }) => {
  const { section, isStart, onEdit, onDelete } = data;

  const handleNodeClick = (e) => {
    e.stopPropagation();
  };

  const getFieldTypeIcon = (type) => {
    switch (type) {
      case "text":
      case "email":
        return "📝";
      case "select":
        return "📋";
      case "radio":
        return "🔘";
      case "checkbox":
        return "☑️";
      case "textarea":
        return "📄";
      default:
        return "❓";
    }
  };

  return (
    <div
      onClick={handleNodeClick}
      className={`bg-white rounded-lg shadow-lg border-2 transition-all duration-200 min-w-[280px] ${
        selected
          ? "border-blue-500 shadow-xl"
          : isStart
          ? "border-green-500"
          : "border-gray-200 hover:border-gray-300"
      } cursor-pointer`}
    >
      {/* Node Header */}
      <div
        className={`p-4 rounded-t-lg ${isStart ? "bg-green-50" : "bg-gray-50"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isStart && <Play className="w-4 h-4 text-green-600" />}
            <FileText className="w-4 h-4 text-gray-600" />
            <h3 className="font-semibold text-gray-900 truncate">
              {section.title}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(section.id)}
              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
              title="Edit section"
            >
              <Settings className="w-4 h-4" />
            </button>
            {!isStart && (
              <button
                onClick={() => onDelete(section.id)}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                title="Delete section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {section.description && (
          <p className="text-sm text-gray-600 mt-1 truncate">
            {section.description}
          </p>
        )}
        {isStart && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Start Section
            </span>
          </div>
        )}
      </div>

      {/* Fields List */}
      <div className="p-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Fields ({section.fields.length})
          </h4>
          {section.fields.slice(0, 3).map((field) => (
            <div
              key={field.id}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm"
            >
              <span className="text-lg">{getFieldTypeIcon(field.type)}</span>
              <span className="flex-1 truncate text-gray-700">
                {field.label}
              </span>
              {field.required && (
                <span className="text-red-500 text-xs">*</span>
              )}
            </div>
          ))}
          {section.fields.length > 3 && (
            <div className="text-xs text-gray-500 text-center py-1">
              +{section.fields.length - 3} more fields
            </div>
          )}
        </div>
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="bg-blue-500 border-2 border-white rounded-full"
        style={{ width: "15px", height: "15px", left: -10 }} // 👈 shift more since dot is bigger
      />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-blue-500 border-2 border-white rounded-full"
        style={{ width: "15px", height: "15px", right: -10 }}
      />
    </div>
  );
};
