import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNavItem, setActiveNavItem] = useState("home");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items
  const navItems = [
    { id: "home", icon: "", label: "Home", path: "/" },
    // { id: 'about_us', icon: '', label: 'About Us' },
    { id: "portfolio", icon: "", label: "Portfolio", path: "/portfolio" },
    // { id: "gallery", icon: "", label: "Gallery" },
    { id: "contact_us", icon: "", label: "Contact Us", path: "/contact-us" },
  ];
  
  // 🔹 Sync activeNavItem with URL
  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = navItems.find(item => item.path === currentPath);
    setActiveNavItem(matchedItem ? matchedItem.id : "home");
  }, [location.pathname]); 

  // Handle scroll for navbar visibility
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsNavbarVisible(false);
          } else {
            setIsNavbarVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle nav item click with ripple effect
  const handleNavClick = (itemId, event) => {
    navigate(navItems.find(item => item.id === itemId)?.path || '/');
    setActiveNavItem(itemId);

    // Create ripple effect
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Smooth scroll to section (placeholder)
    console.log(`Navigating to ${itemId}`);
  };
  // Floating Bottom Navbar
  const getNavbarClasses = () => {
    const baseClasses =
      "fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ease-out";
    const responsiveClasses = "md:w-fit w-[calc(100%-20px)] md:left-1/2 ";
    const visibilityClasses = isNavbarVisible
      ? "translate-y-0"
      : "translate-y-24";

    return `${baseClasses} ${responsiveClasses} ${visibilityClasses}`;
  };

  const getContainerClasses = () => {
    const baseClasses =
      "flex items-center justify-center gap-2 p-3 rounded-3xl bg-[var(--nav-bg-color)] border border-white border-opacity-20 shadow-2xl transition-all duration-300";

    const responsiveClasses =
      "md:justify-center justify-around md:gap-2 gap-0 md:px-4 px-2 md:py-3 py-4";

    return `${baseClasses} ${responsiveClasses}`;
  };

  const getItemClasses = (itemId) => {
    const baseClasses =
      "text-nowrap flex items-center justify-center p-3 rounded-2xl text-[var(--primary-color)] font-medium text-sm transition-all duration-300 relative overflow-hidden cursor-pointer select-none";
    const hoverClasses = "hover:-translate-y-1 hover:scale-105";
    const responsiveClasses =
      "md:flex-row md:min-w-11 md:h-11 md:px-4 flex-col min-w-0 h-auto px-1 py-2 flex-1 text-center";

    const isActive = activeNavItem === itemId;

    const styleActiveClasses = isActive
      ? "bg-white text-[var(--primary-color)]"
      : "hover:bg-white hover:bg-opacity-10 hover:text-[var(--primary-color)] text-gray-300";

    return `${baseClasses} ${hoverClasses} ${responsiveClasses} ${styleActiveClasses}`;
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      {children}
      <Footer />

      {/* Floating Bottom Navbar */}
      <nav className={getNavbarClasses()}>
        <div className={getContainerClasses()}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(item.id, e)}
              className={getItemClasses(item.id)}
            >
              <span className="text-xl md:mr-2 md:mb-0 mb-1 transition-transform duration-300 hover:scale-102">
                {item.icon}
              </span>
              {/* {activeNavItem === item.id && ( */}
              <span className="md:inline text-xs md:text-sm font-medium">
                {item.label}
              </span>
              {/* )} */}
            </button>
          ))}
        </div>
      </nav>

      {/* Ripple Animation Styles */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }

        video::-webkit-media-controls {
          display: none !important;
        }

        video::-webkit-media-controls-panel {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default Layout;
