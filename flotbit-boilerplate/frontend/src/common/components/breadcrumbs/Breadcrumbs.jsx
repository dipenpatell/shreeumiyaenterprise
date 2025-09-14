import { RightArrow } from "../../../assets/icons/svgs";

export const Breadcrumbs = ({}) => {
  return (
    <div className="breadcrumbs-wrapper">
      <div className="breadcrumb-item">Form</div>
      <RightArrow height={11} fill={"var(--light-dark-color)"} />
      <div className="breadcrumb-item active">Customer Feedback</div>
    </div>
  );
};
