import { useState } from "react";

const Navbar = ({ leftNav, navText, rightNav, className, style }) => {
  return (
    <div className={`navbar-wrapper relative ${className}`} style={{...style}}>
      <div
        className={`flex items-center justify-center rounded-full h-[2.75em] w-[2.75em] 
          ${
            leftNav
              ? "shadow-[var(--nav-icon-shadow)] bg-[var(--nav-icon-bg)]"
              : ""
          }
          `}
        onClick={leftNav?.onClick || null}
      >
        {leftNav?.icon}
      </div>
      <div className="mx-4 flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-center font-bold text-[1.125em] text-[var(--nav-text-color)]">
        {navText}
      </div>
      <div
        className={`flex items-center justify-center rounded-full h-[2.75em] w-[2.75em] 
          ${
            rightNav
              ? "shadow-[var(--nav-icon-shadow)] bg-[var(--nav-icon-bg)]"
              : ""
          }
          `}
        onClick={rightNav?.onClick || null}
      >
        {rightNav?.icon}
      </div>
    </div>
  );
};

export default Navbar;
