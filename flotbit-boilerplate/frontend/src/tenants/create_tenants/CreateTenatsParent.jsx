import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import WorkspaceStep1 from "./TanantsName";
import WorkspaceStep2 from "./TanantsProfileImg";
import WorkspaceStep3 from "./TenantsTeamInvitation";



export default function WorkspaceCreator() {
  const navigate = useNavigate();

  const token = "9f1ec40fd92e6c2e82c420e6c6471d9928599d7f";


  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    workspaceName: "",
    profilePhoto: null,
    profileFile: null,
    emails: []
  });

  const next = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const back = () => setStep((prev) => prev - 1);

  const finish = async () => {
    console.log("Final Data:", formData);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.workspaceName);
      formDataObj.append("teams", JSON.stringify(formData.emails || []));
      formDataObj.append("creator", 2);
      if (formData.profilePhoto) {
        formDataObj.append("profile_image", formData.profilePhoto); // actual file
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/tenants/tenant/`,
        formDataObj,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res: ", res);
      console.log("res.data: ", res.status);
      if (res.status === 201) {
         navigate("/tenants/create");
      }

      console.log("Tenant created:", res.data);
    } catch (err) {
      console.error("Error creating tenant:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]" style={{ width: "100%" }}>
      {step === 1 && (
        <WorkspaceStep1
          defaultValue={formData.workspaceName}
          onNext={(workspaceName) => next({ workspaceName })}
          formData={formData}
        />
      )}
      {step === 2 && (
        <WorkspaceStep2
          defaultValue={formData.profilePhoto}
          onBack={back}
          onNext={(profilePhoto) => next({ profilePhoto })}
          formData={formData}
        />
      )}
      {step === 3 && (
        <WorkspaceStep3
          defaultValue={formData.emails}
          formData={formData}
          onBack={back}
          onComplete={(emails) => {
            next({ emails });
            finish();
          }}
        />
      )}
    </div>
  );
}
