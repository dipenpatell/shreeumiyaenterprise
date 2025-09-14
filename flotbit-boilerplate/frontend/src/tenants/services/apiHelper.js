import { setTenants, setError, setLoading } from "../tenantSlice";

export async function getTenants(dispatch) {
  try {
    let auth = localStorage.getItem("authUser");

    const tenantsResponse = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/tenants/",
      {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Token " + auth,
         },
      }
    );

    if (!tenantsResponse.ok) {
      const errorData = await tenantsResponse.json();
      console.log("errorData: ", errorData);
      throw new Error("Failed to get tenant");
    }

    const tenantsData = await tenantsResponse.json();

    // Store Data
    dispatch(setTenants(tenantsData));
  } catch (error) {
    dispatch(setError({genral: ["Failed to get tenant"]}));
    console.error("Auth Error:", error);
  }
  dispatch(setLoading(false));
}

export async function createTenant(body, dispatch) {
  try {
    let auth = localStorage.getItem("authUser");

    const tenantResponse = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/tenants/",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Token " + auth,
         },
        body: JSON.stringify(body),
      }
    );

    if (!tenantResponse.ok) {
      const errorData = await tenantResponse.json();
      console.log("errorData: ", errorData);
      throw new Error("Failed to get tenant");
    }

    const tenantsData = await tenantResponse.json();

    // Store Data
    // dispatch(setTenants(tenantsData));
  } catch (error) {
    dispatch(setError({genral: ["Failed to get tenant"]}));
    console.error("Auth Error:", error);
  }
  dispatch(setLoading(false));
}
