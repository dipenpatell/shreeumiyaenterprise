import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../common/components/Navbar";
import { BackArrow, InfoOutline } from "../../assets/icons/svgs";
import { useNavigate } from "react-router-dom";

export default function CreateTenant() {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);


  const token = "9f1ec40fd92e6c2e82c420e6c6471d9928599d7f"; // 🔹 replace with your token (or fetch from localStorage/context)

  // 🔹 Fetch tenants on load
  const fetchTenants = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/tenants/tenant/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTenants(res.data.tenants || []); // adjust if API structure differs
    } catch (err) {
      console.error("Error fetching tenants:", err);
    }
  };

  // 🔹 Create new tenant
  const createTenant = async () => {
    navigate("/tenants/create/new")
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div
      className="flex w-full flex-col overflow-hidden relative 
                transition-all duration-300 ease-in-out 
                bg-[var(--main-layout-bg)] 
                text-[#000000]"
    >
      <Navbar
        leftNav={{
          icon: <BackArrow height={"17px"} fill={"var(--form-primary-color)"} />,
          onClick: () => navigate("/tenants")
        }}
        navText={"Create Workspace"}
        rightNav={{
          icon:
            <InfoOutline height={"30px"} fill={"var(--form-primary-color)"} />
        }}
      />

      {/* Content */}
      <div className="px-4 py-6 m-4">
        {/* New Workspace Card */}
        <div
          className="bg-[#EEEEEE] rounded-2xl p-6 mb-6 
                                shadow-[-10px_-10px_16px_0px_#FFFFFF,10px_10px_20px_0px_#D2D2D2]"
        >
          <div className="flex flex-col items-center text-center">
            <div>
              <img
                src="/capa_1.svg"
                alt="Workspace icon"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold mb-3">
              Want to use with a different team?
            </h2>
            <button
              onClick={createTenant}
              disabled={loading}
              className="w-full bg-[#EEEEEE] text-gray-700 font-medium text-sm px-6 py-3 
                                        rounded-[10px] 
                                        shadow-[-10px_-10px_16px_0px_#FFFFFF,10px_10px_20px_0px_#D2D2D2] 
                                        transition-all disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create a new workspace"}
            </button>
          </div>
        </div>

        {/* Workspace Invites */}
        <div>
          <h3 className="text-[#323946] font-medium mb-4">Workspace invites</h3>
          <div className="space-y-3">
            {tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="rounded-xl pb-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={`flex items-center justify-center mr-3`}>
                    <img
                      src={tenant.profile_image || "/cp_logo.png"}
                      alt={`${tenant.name} logo`}
                      className="object-contain w-8 h-8"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
                    <p className="text-sm text-gray-500">
                      {tenant.members} members
                    </p>
                  </div>
                </div>
                <button
                  className="hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#3B4F7D", borderRadius: "10px" }}
                >
                  Launch flo
                </button>
              </div>
            ))}
            {tenants.length === 0 && (
              <p className="text-sm text-gray-500">No invites found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
