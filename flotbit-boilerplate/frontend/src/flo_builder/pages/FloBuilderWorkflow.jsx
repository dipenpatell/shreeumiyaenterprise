import { useState } from "react";

import { FlowEditor } from "../components/flo_workflow/FlowEditor";

const FloBuilderWorkflow = () => {
  // const { floBuilder } = useSelector((state) => state);

  // const [floConfig, setFloConfig] = useState({});

  // useEffect(() => {
  //   setFloConfig(floBuilder.build || {});
  // }, [floBuilder.build]);

  const [config, setConfig] = useState({
    id: "sample-form",
    title: "Sample Multi-Section Form",
    description: "This demonstrates conditional logic between sections",
    startSectionId: "section-1",
    sections: [
      {
        id: "section-1",
        title: "Personal Information",
        description: "Tell us about yourself",
        fields: [
          {
            id: "name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
          },
          {
            id: "age",
            type: "select",
            label: "Age Group",
            required: true,
            options: [
              { value: "under-18", label: "Under 18" },
              { value: "18-65", label: "18-65" },
              { value: "over-65", label: "Over 65" },
            ],
          },
        ],
      },
      {
        id: "section-2",
        title: "Employment Information",
        description: "For adults (18-65)",
        fields: [
          {
            id: "employment",
            type: "radio",
            label: "Employment Status",
            required: true,
            options: [
              { value: "employed", label: "Employed" },
              { value: "unemployed", label: "Unemployed" },
              { value: "student", label: "Student" },
            ],
          },
          {
            id: "company",
            type: "text",
            label: "Company Name",
            placeholder: "Your current company",
          },
        ],
      },
      {
        id: "section-3",
        title: "Student Information",
        description: "For young adults under 18",
        fields: [
          {
            id: "school",
            type: "text",
            label: "School Name",
            placeholder: "Enter your school name",
            required: true,
          },
          {
            id: "grade",
            type: "select",
            label: "Grade Level",
            required: true,
            options: [
              { value: "9", label: "9th Grade" },
              { value: "10", label: "10th Grade" },
              { value: "11", label: "11th Grade" },
              { value: "12", label: "12th Grade" },
            ],
          },
        ],
      },
      {
        id: "section-4",
        title: "Senior Information",
        description: "For seniors over 65",
        fields: [
          {
            id: "retirement",
            type: "radio",
            label: "Retirement Status",
            required: true,
            options: [
              { value: "retired", label: "Retired" },
              { value: "semi-retired", label: "Semi-retired" },
              { value: "still-working", label: "Still Working" },
            ],
          },
          {
            id: "interests",
            type: "checkbox",
            label: "Interests",
            options: [
              { value: "travel", label: "Travel" },
              { value: "gardening", label: "Gardening" },
              { value: "reading", label: "Reading" },
              { value: "volunteering", label: "Volunteering" },
            ],
          },
        ],
      },
    ],
    conditionalRules: [
      {
        id: "rule-1",
        sourceSectionId: "section-1",
        fieldId: "age",
        operator: "equals",
        value: "18-65",
        targetSectionId: "section-2",
        elseSectionId: "section-3",
      },
      {
        id: "rule-2",
        sourceSectionId: "section-1",
        fieldId: "age",
        operator: "equals",
        value: "over-65",
        targetSectionId: "section-4",
      },
    ],
  });

  return (
    <div
      className="flex-1 flex justify-center items-center p-[2em]
        max-md:p-[1em]"
    >
      <div
        className="w-full h-full p-[1em]
            rounded-2xl p-[1.25em] flex items-center justify-center overflow-hidden
            bg-[var(--background-color-300)] [box-shadow:var(--outset-shadow-200)]"
      >
        <FlowEditor config={config} onConfigChange={setConfig} />
      </div>
    </div>
  );
};

export default FloBuilderWorkflow;
