import { useState, useEffect } from "react";
import VerticalLayout from "./vertical_layout";
import HorizontalLayout from "./horizontal_layout";

const Layout = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <VerticalLayout {...props} />
  ) : (
    <HorizontalLayout {...props} />
  );
};

export default Layout;
