import React, { useState, useRef, useCallback } from "react";

const FileUpload = ({
  onChange,
  acceptedFileTypes = "",
  maxSize = 5, // in MB
  style = {},
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize} MB`);
      return false;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!acceptedFileTypes.includes(fileExtension)) {
      alert("File type not supported");
      return false;
    }

    return true;
  }, [maxSize, acceptedFileTypes]);

  const handleFileSelect = useCallback((file) => {
    if (file && validateFile(file)) {
      setSelectedFile(file);
      if (onChange) {
        onChange(file);
      }
    }
  }, [validateFile, onChange]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) {
      onChange(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      style={{
        ...style,
      }}
      className={"form-component " + className}
    >
      {!selectedFile ? (
        <div className="text-left">
          <div className="flex items-center justify-between mb-[1.125em]">
            <div className="flex items-center gap-[0.625em] text-[1.25em] font-semibold text-[var(--form-primary-color)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                className="w-[1.5625em] h-[1.5625em] shrink-0"
              >
                <path
                  d="M5.20833 3.38574C4.4486 3.38574 3.71998 3.68755 3.18277 4.22476C2.64555 4.76197 2.34375 5.49059 2.34375 6.25033V18.7503C2.34375 19.5101 2.64555 20.2387 3.18277 20.7759C3.71998 21.3131 4.4486 21.6149 5.20833 21.6149H19.7917C20.5514 21.6149 21.28 21.3131 21.8172 20.7759C22.3544 20.2387 22.6562 19.5101 22.6562 18.7503V9.37532C22.6562 8.61559 22.3544 7.88697 21.8172 7.34976C21.28 6.81254 20.5514 6.51074 19.7917 6.51074H12.1458C11.829 6.51068 11.5231 6.39514 11.2854 6.18574L8.91875 4.10033C8.39576 3.63986 7.72286 3.38581 7.02604 3.38574H5.20833Z"
                  fill="var(--form-primary-color)"
                />
              </svg>
              Upload file
            </div>

            <div
              className="form-action-button text-[1.125em] font-semibold cursor-pointer transition-all duration-200 rounded-[0.625em] px-[1.25em] py-[0.59375em] border-none"
              onClick={openFileDialog}
            >
              Browse
            </div>
          </div>

          <div className="text-[0.6875em] font-normal text-[var(--light-dark-color)] leading-[1.4]">
            File Type For Uploading Documents Must Be In {acceptedFileTypes} Format.
            Maximum Size is {maxSize} MB.
          </div>
        </div>
      ) : (
        <div className="bg-[#f2f3fc] rounded-[0.5em] p-[1em] mt-[1em] flex items-center justify-between">
          <div style={{ overflow: "hidden" }}>
            <div className="text-[0.875em] font-medium text-[#52536b] truncate max-w-[12rem]">
              📄 {selectedFile.name}
            </div>
            <div className="text-[0.75em] text-[#8a8b9e] mt-[0.25em]">
              {formatFileSize(selectedFile.size)}
            </div>
          </div>
          <button
            className="bg-[#ff4444] text-white rounded-full w-[1.5em] h-[1.5em] flex items-center justify-center text-[1em] cursor-pointer transition-all duration-200 shrink-0 hover:bg-[#e03e3e] hover:scale-110 active:scale-95"
            onClick={removeFile}
          >
            ×
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
