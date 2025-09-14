import { GoogleForm } from "../../../assets/icons/svgs";

import ListHeader from "./ListHeader";
import ListSection from "./ListSection";

const RecentFloList = ({}) => {
  return (
    <div className={`flex w-full flex-col overflow-hidden`}>
      {/* List Header */}
      <ListHeader />

      {/* List section */}
      <ListSection />
    </div>
  );
};

export default RecentFloList;
