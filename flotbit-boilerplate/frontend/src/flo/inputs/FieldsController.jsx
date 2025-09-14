

// Flo inupts
import StepProgress from "./StepProgress";
import ReviewStar from "./ReviewStar";
import NumberInput from "./NumberInput";
import MultiChoice from "./MultiChoice";
import FileUpload from "./FileUpload";
import ReviewEmojis from "./ReviewEmojis";
import YesOrNoInput from "./YesOrNoInput";
import DetailedMultiChoice from "./DetailedMultiChoice";
import TextInput from "./TextInput";

const FieldsController = ({ field, onChange }) => {
  switch (field.type) {

    case "stepped_progressbar":
      return (
        <StepProgress
          total={field.config.total?.value}
          defaultValue={field.config.defaultValue?.value}
          showLabels={field.config.showLabels?.value}
          onChange={onChange}
          style={{}}
          className=""
        />
      );

    case "star_rating":
      return (
        <ReviewStar
          total={field.config.total?.value}
          defaultValue={field.config.defaultValue?.value}
          onChange={onChange}
        />
      );

    case "number":
      return (
        <NumberInput
          defaultValue={field.config.defaultValue?.value}
          min={field.config.min?.value}
          max={field.config.max?.value}
          onChange={onChange}
        />
      );

    case "text":
      return (
        <TextInput
          defaultValue={field.config.defaultValue?.value}
          placeholder={field.placeholder}
          onChange={onChange}
        />
      );

    case "checkbox":
      return (
        <MultiChoice
          defaultValue={field.config.defaultValue?.value}
          options={field.config.options?.value}
          multiSelect={true}
          onChange={onChange}
        />
      );

    case "radio":
      return (
        <MultiChoice
          options={field.config.options?.value}
          multiSelect={false}
          defaultValue={field.config.defaultValue?.value}
          onChange={onChange}
        />
      );

    case "file_upload":
      return (
        <FileUpload
          maxSize={field.config.maxSize?.value}
          acceptedFileTypes={field.config.acceptedFileTypes?.value}
          onChange={onChange}
        />
      );

    case "emojis_review":
      return (
        <ReviewEmojis
          defaultValue={field.config.defaultValue?.value}
          onChange={onChange}
        />
      );

    case "yes_or_no":
      return (
        <YesOrNoInput
          defaultValue={field.config.defaultValue?.value}
          onChange={onChange}
        />
      );

    case "detailed_options":
      return (
        <DetailedMultiChoice
          options={field.config.options?.value}
          defaultValue={field.config.defaultValue?.value}
          onChange={onChange}
        />
      );

    default:
      return <></>;
  }
};


export default FieldsController;