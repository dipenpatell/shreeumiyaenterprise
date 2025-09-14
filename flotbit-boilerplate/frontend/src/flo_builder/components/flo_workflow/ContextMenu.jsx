import React from 'react';
import { Edit, Trash2, Play, Copy } from 'lucide-react';

export const ContextMenu = ({
  x,
  y,
  nodeId,
  isStart,
  onEdit,
  onDelete,
  onSetStart,
  onDuplicate,
  onClose
}) => {
  const menuItems = [
    {
      icon: Edit,
      label: 'Edit Section',
      onClick: () => {
        onEdit(nodeId);
        onClose();
      }
    },
    {
      icon: Copy,
      label: 'Duplicate Section',
      onClick: () => {
        onDuplicate(nodeId);
        onClose();
      }
    },
    ...(isStart
      ? []
      : [
          {
            icon: Play,
            label: 'Set as Start Section',
            onClick: () => {
              onSetStart(nodeId);
              onClose();
            }
          }
        ]),
    ...(isStart
      ? []
      : [
          {
            icon: Trash2,
            label: 'Delete Section',
            onClick: () => {
              onDelete(nodeId);
              onClose();
            },
            className: 'text-red-600 hover:bg-red-50'
          }
        ])
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Context Menu */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[180px]"
        style={{
          left: x,
          top: y,
          transform: 'translate(0, 0)'
        }}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                item.className || 'text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
