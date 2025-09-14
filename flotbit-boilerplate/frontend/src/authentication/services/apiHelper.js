import { setAuth, setError, setLoading, setUser } from "../authSlice";

export async function detailedAuth(url, body, dispatch) {
  try {
    const authResponse = await fetch(import.meta.env.VITE_BACKEND_API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      dispatch(
        setError(
          typeof errorData === "object"
            ? errorData
            : { genral: ["Failed to authenticate"] }
        )
      );
      console.log("errorData: ", errorData);
      throw new Error("Failed to authenticate");
    }

    const authData = await authResponse.json();
    console.log("authData: ", authData);
    const token = authData?.key;
    const userData = authData?.user;

    // Store Data
    localStorage.setItem("authUser", token);
    localStorage.setItem("userData", JSON.stringify({
        "pk": 7,
        "username": "dipenpatel0243@gmail.cnn",
        "email": "dipenpatel0243@gmail.cnn",
        "first_name": "Dipen",
        "last_name": "patel"
    }));
    dispatch(setAuth(token));
    dispatch(setUser(userData));
  } catch (error) {
    dispatch(setError({ genral: ["Failed to authenticate"] }));
    console.error("Auth Error:", error);
  }
  dispatch(setLoading(false));
}
