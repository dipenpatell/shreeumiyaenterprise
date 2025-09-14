import React, { useState } from "react";
import Navbar from "../../common/components/Navbar";
import { BackArrow, InfoOutline } from "../../assets/icons/svgs";
import { Button } from "../../common/components/ui/button";

export default function WorkspaceStep2({ defaultValue, onBack, onNext }) {
  const [profilePhoto, setProfilePhoto] = useState(defaultValue || "/profile.png"); // default logo
  const [file, setFile] = useState(null);

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // keep file for API upload

      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleNext = () => {
    onNext?.(file); // pass data back to wizard
  };

  return (
    <div
      className="flex w-full flex-col min-h-screen overflow-hidden 
                 bg-[#F8F8F8] text-[#000000]"
    >
      {/* Navbar */}
      <Navbar
        leftNav={{
          icon: <BackArrow height={"17px"} fill={"var(--form-primary-color)"} />,
          onClick: onBack
        }}
        navText={"New Workspace"}
        rightNav={{
          icon:
            <InfoOutline height={"30px"} fill={"var(--form-primary-color)"} />
        }}
      />

      {/* Content */}
      <div className="px-6 py-6 flex flex-col items-center">
        {/* Step indicator */}
        <p
          className="text-sm text-gray-500 mb-3 self-start"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
          }}
        >
          Step 2 to 3
        </p>

        {/* Title */}
        <h2
          className="mb-3 self-start"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
          }}
        >
          Your profile photo <span className="font-normal">(optional)</span>
        </h2>

        {/* Description */}
        <p
          className="mb-6 text-gray-500 self-start"
          style={{
            fontFamily: "SF Pro, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "100%",
            width: "75%",
          }}
        >
          Help your teammate know they’re talking to the right person
        </p>

        {/* Profile photo preview */}
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover mb-4"
        />

        {/* Edit photo button */}
        <label
          htmlFor="upload-photo"
          className="cursor-pointer text-[#000000] text-sm font-medium"
        >
          <div
            className="flex justify-center items-center"
            style={{
              width: "123px",
              height: "39px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "#D1D5DB",
              padding: "10px",
              gap: "10px",
              opacity: 1,
              backgroundColor: "#FFFFFF",
              fontFamily: "SF Pro, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "100%",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Edit photo
          </div>
          <input
            type="file"
            id="upload-photo"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>

        {/* Navigation Buttons */}
        <Button
          variant="primary"
          label={"Next"}
          className={"w-full mt-8"}
          onclick={handleNext}
          type="submit"
        />
      </div>
    </div>
  );
}
