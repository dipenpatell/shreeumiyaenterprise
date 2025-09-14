import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const HorizontalLayout = (props) => {
  const layout = useSelector((state) => state.layout);

  return (
    <div className="horizontal-layout" id="layout-wrapper">
      <div className="h-full overflow-hidden w-auto">
        {layout.sidebar.isVisible && <Sidebar />}
      </div>
      <div className="main-content">{props.children}</div>
    </div>
  );
};

export default HorizontalLayout;
