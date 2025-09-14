import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

import { FormSectionNode } from "./FormSectionNode";
import { ContextMenu } from "./ContextMenu";
import { SectionEditor } from "./SectionEditor";
import EdgeEditor from "./EdgeEditor";
import { Plus } from "lucide-react";

const nodeTypes = {
  floSection: FormSectionNode,
};

export const FlowEditor = ({ config, onConfigChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingRule, setEditingRule] = useState(null);

  // Initialize nodes and edges from config
  useEffect(() => {
    const flowNodes = config.sections.map((section, index) => ({
      id: section.id,
      type: "floSection",
      position:
        "position" in section
          ? section.position
          : { x: (index % 3) * 300, y: Math.floor(index / 3) * 300 },
      // position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
      data: {
        section,
        isStart: section.id === config.startSectionId,
        onEdit: (sectionId) => {
          const p = config.sections.find((p) => p.id === sectionId);
          if (p) setEditingSection(p);
        },
        onDelete: (sectionId) => handleDeleteSection(sectionId),
      },
    }));

    const flowEdges = config.conditionalRules.map((rule, index) => ({
      id: `rule-${index}`,
      source: rule.sourceSectionId,
      target: rule.targetSectionId,
      label: `${rule.fieldId} ${rule.operator} ${rule.value}`,
      type: "smoothstep",
      style: { stroke: "#3B82F6", strokeWidth: 2 },
      labelStyle: {
        fill: "#374151",
        fontWeight: 600,
        fontSize: 12,
        background: "#F3F4F6",
        padding: "4px 8px",
        borderRadius: "4px",
      },
    }));

    // Add else edges if they exist
    config.conditionalRules.forEach((rule, index) => {
      if (rule.elseSectionId) {
        flowEdges.push({
          id: `else-rule-${index}`,
          source: rule.sourceSectionId,
          target: rule.elseSectionId,
          label: "else",
          type: "smoothstep",
          style: { stroke: "#EF4444", strokeWidth: 2, strokeDasharray: "5,5" },
          labelStyle: {
            fill: "#DC2626",
            fontWeight: 600,
            fontSize: 12,
            background: "#FEF2F2",
            padding: "4px 8px",
            borderRadius: "4px",
          },
        });
      }
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [config, setNodes, setEdges]);

  // Edge Click
  const handleEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();

      // Find matching rule in config
      const ruleIndex = config.conditionalRules.findIndex(
        (r) => r.sourceSectionId === edge.source && r.targetSectionId === edge.target
      );

      if (ruleIndex !== -1) {
        setEditingRule({
          ...config.conditionalRules[ruleIndex],
          index: ruleIndex,
        });
      }
    },
    [config]
  );
  // Edge Connect
  const onConnect = useCallback(
    (params) => {
      if (!params.source || !params.target) return;

      const newRule = {
        id: `rule-${Date.now()}`,
        sourceSectionId: params.source,
        fieldId: "condition",
        operator: "equals",
        value: "true",
        targetSectionId: params.target,
      };

      const updatedConfig = {
        ...config,
        conditionalRules: [...config.conditionalRules, newRule],
      };

      onConfigChange(updatedConfig);
      setEdges((eds) => addEdge(params, eds));
    },
    [config, onConfigChange, setEdges]
  );
  
  // Add new Section
  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      description: "Section description",
      fields: [
        {
          id: `field-${Date.now()}`,
          type: "text",
          label: "Sample Field",
          placeholder: "Enter text...",
          required: false,
        },
      ],
    };

    const updatedConfig = {
      ...config,
      sections: [...config.sections, newSection],
    };

    onConfigChange(updatedConfig);
  };
  // Section Drag
  const onNodeDragStop = useCallback(
    (event, node) => {
      const updatedConfig = {
        ...config,
        sections: config.sections.map((section) =>
          section.id === node.id
            ? {
                ...section,
                position: node.position, // save final dropped position
              }
            : section
        ),
      };

      onConfigChange(updatedConfig);
    },
    [config, onConfigChange]
  );
  // Delete Section
  const handleDeleteSection = (sectionId) => {
    const updatedConfig = {
      ...config,
      sections: config.sections.filter((section) => section.id !== sectionId),
      conditionalRules: config.conditionalRules.filter(
        (rule) => rule.sourceSectionId !== sectionId && rule.targetSectionId !== sectionId
      ),
    };

    onConfigChange(updatedConfig);
  };

  // Section Context
  const handleNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      nodeId: node.id,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);
  // Handle click Edit section
  const handleEditSection = (sectionId) => {
    const section = config.sections.find((p) => p.id === sectionId);
    if (section) {
      setEditingSection(section);
    }
  };
  // Handle click Duplicate section
  const handleDuplicateSection = (sectionId) => {
    const section = config.sections.find((p) => p.id === sectionId);
    if (!section) return;

    const duplicatedSection = {
      ...section,
      id: `section-${Date.now()}`,
      title: `${section.title} (Copy)`,
    };

    const updatedConfig = {
      ...config,
      sections: [...config.sections, duplicatedSection],
    };

    onConfigChange(updatedConfig);
  };
  // Handle click Set as start section
  const handleSetStartSection = (sectionId) => {
    const updatedConfig = {
      ...config,
      startSectionId: sectionId,
    };

    onConfigChange(updatedConfig);
  };

  // Save Section
  const handleSaveSection = (updatedSection) => {
    const updatedConfig = {
      ...config,
      sections: config.sections.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      ),
    };

    onConfigChange(updatedConfig);
  };
  // Save Rules
  const handleSaveRule = (updatedRule) => {
    const updatedConfig = {
      ...config,
      conditionalRules: config.conditionalRules.map((rule, i) =>
        i === editingRule.index ? updatedRule : rule
      ),
    };
    onConfigChange(updatedConfig);
    setEditingRule(null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Visual Form Builder
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddSection}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flow Editor */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          onEdgeClick={handleEdgeClick}
          onConnect={onConnect}
          onNodeContextMenu={handleNodeContextMenu}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Controls className="bg-white border border-gray-200 rounded-lg shadow-lg" />
          <MiniMap
            className="bg-white border border-gray-200 rounded-lg shadow-lg"
            nodeColor="#3B82F6"
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#E5E7EB"
          />
        </ReactFlow>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          isStart={contextMenu.nodeId === config.startSectionId}
          onEdit={handleEditSection}
          onDelete={handleDeleteSection}
          onSetStart={handleSetStartSection}
          onDuplicate={handleDuplicateSection}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Section Editor Modal */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          onSave={handleSaveSection}
          onClose={() => setEditingSection(null)}
        />
      )}
      {editingRule && (
        <EdgeEditor
          rule={editingRule}
          onSave={handleSaveRule}
          onClose={() => setEditingRule(null)}
        />
      )}
    </div>
  );
};
