import { useEffect, useState } from "react";

import AutobitsFullLogo from "../../../assets/icons/AutobitsFullLogo";
import AutobitsLogo from "../../../assets/icons/AutobitsLogo";
import {
  BoxNotification,
  DashboardFill,
  FormFill,
  MenuLine,
  SettingIcon,
  TaskListFilled,
} from "../../../assets/icons/svgs";


const Sidebar = () => {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const [navigators, setNavigators] = useState([
    {
      icon: <DashboardFill fill={"var(--primary-color)"} />,
      label: "Dashboard"
    },{
      icon: <FormFill fill={"var(--primary-color)"} />,
      label: "Form"
    },{
      icon: <TaskListFilled fill={"var(--primary-color)"} />,
      label: "Task"
    },{
      icon: <BoxNotification fill={"var(--primary-color)"} />,
      label: "Notification"
    },
    {
      icon: <SettingIcon fill={"var(--primary-color)"} />,
      label: "Setting"
    }
  ]);

  useEffect(() => {
    const handleResize = () => setSidebarCollapsed(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    

    
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className={`sidebar-wrapper outset-fb-blue-shadow ${sidebarCollapsed ? "collapsed-sidebar" : ""}`}>

      <div className="header-wrapper">
        <div className="logo-wrapper full-logo">
          <AutobitsFullLogo style={{}} />
        </div>
        <div className="logo-wrapper cut-logo" onClick={() => setSidebarCollapsed(false)}>
          <AutobitsLogo style={{}} />
        </div>
        <div className="menu-icon" onClick={() => setSidebarCollapsed(true)} >
          <MenuLine />
        </div>
      </div>

      <div className="sidebar-saparator"></div>

      <div className="navigators-wrapper">

        {navigators.map((nav, i) => (
          <div id={"nav_" + i + i} className={`navigator ${currentPage === nav.label ? "active" : ""}`} onClick={() => setCurrentPage(nav.label)}>
            <div className="navigator-icon">
              {nav.icon}
            </div>
            <div className="navigator-label">{nav.label}</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;
