import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setLoading } from "../tenantSlice";
import Navbar from "../../common/components/Navbar";
import { Button } from "../../common/components/ui/button";
import { BackArrow, InfoOutline } from "../../assets/icons/svgs";

export default function WorkspaceStep1({ defaultValue, onNext }) {
  const navigate = useNavigate()

  const [workspaceName, setWorkspaceName] = useState(defaultValue || "");

  const token = "9f1ec40fd92e6c2e82c420e6c6471d9928599d7f"; // 🔹 replace with your token (or fetch from localStorage/context)

  const handleBack = () => {
    navigate("/tenants/create")
  };

  const handleNext = async () => {
    if (!workspaceName.trim()) {
      alert("Please enter a name for your team or tenant.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/tenants/tenant/check-name/`,
        {
          params: { name: workspaceName },
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (res.data.exists) {
        alert("Tenant with this name already exists. Please choose another name.");
        setLoading(false);
        return;
      }

      // ✅ Safe to proceed
      onNext?.(workspaceName);
    } catch (err) {
      console.error("Error checking tenant:", err);
      alert("Something went wrong while checking tenant name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex w-full flex-col min-h-screen overflow-hidden 
                 bg-[#F8F8F8] text-[#000000]">
      {/* Navbar */}
      <Navbar
        leftNav={{
          icon: <BackArrow height={"17px"} fill={"var(--form-primary-color)"} />,
          onClick : handleBack
        }}
        navText={"New Workspace"}
        rightNav={{
          icon:
            <InfoOutline height={"30px"} fill={"var(--form-primary-color)"} />
        }}
      />

      {/* Content */}
      <div className="px-6 py-6">
        <p className="text-sm text-gray-500 mb-3 font-[SF Pro]">
          Step 1 to 3
        </p>

        {/* Title */}
        <h2
          className="mb-3"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0px",
            width: "60%",
          }}
        >
          What’s the name of your tenet or team?
        </h2>

        {/* Description */}
        <p
          className="mb-8 text-gray-500"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "100%",
            letterSpacing: "0px",
            width: "70%",
          }}
        >
          This will be the name of your flo workspace – choose something that
          your team will recognise.
        </p>

        {/* Input field with neumorphic shadow */}
        <input
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="e.g. Sunstar capital"
          className="w-full px-4 py-3 rounded-2xl text-gray-700 
                     bg-[#F8F8F8]
                     shadow-[-10px_-10px_16px_0px_#FFFFFF,10px_10px_20px_0px_#D2D2D2]
                     focus:outline-none focus:ring-2 focus:ring-[#3B4F7D]"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: "200%",
          }}
        />

        {/* Next Button */}
        <Button
          variant="primary"
          label={"Next"}
          className={"w-full mt-8"}
          onclick={handleNext}
        />
      </div>
    </div>
  );
}
