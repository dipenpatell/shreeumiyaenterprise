import { setAuth, setLoading, setUser } from "../authSlice"; // Adjust path as per your project


export async function googleSocialAuth(access_token, dispatch) {
  /**
   * Parents
   *  - GoogleSignInButton
   * 
   * What is does?
   *  - Uses the access token returned from google login and sends a request to the server to get token 
   *  - Using token get user data and store into redux
   */

  try {
    const authResponse = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/users/auth/social/google/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token }),
      }
    );

    if (!authResponse.ok) {
      throw new Error("Failed to authenticate with Google");
    }

    const authData = await authResponse.json();
    const token = authData?.key;

    const userResponse = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/users/auth/user/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    /**
     * userData -> Shape: 
     * {
            "pk": 0,
            "username": "usename",
            "email": "example@mail.com",
            "first_name": "First",
            "last_name": "Last"
        }
     */

    localStorage.setItem("authUser", token);
    localStorage.setItem("userData", userData);
    dispatch(setAuth(token));
    dispatch(setUser(userData));
    
  } catch (error) {
    console.error("Google Social Auth Error:", error);
  }
  dispatch(setLoading(false))
}

export async function facebookSocialAuth(access_token, dispatch) {
  
  /**
   * Parents
   *  - FacebookSignInButton
   * 
   * What is does?
   *  - Uses the access token returned from facebook login and sends a request to the server to get token 
   *  - Using token get user data and store into redux
   */
  
  try {
    // Send token to your backend
    const authResponse = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/users/auth/social/facebook/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: access_token,
      }),
      credentials: "include",
    });

    if (!authResponse.ok) {
      throw new Error("Failed to authenticate with Google");
    }

    const authData = await authResponse.json();
    console.log("authData: ", authData);
    const token = authData?.key;

    dispatch(setAuth(token));

    const userResponse = await fetch(
      import.meta.env.VITE_BACKEND_API_URL + "/users/auth/user/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    /**
     * userData -> Shape: 
     * {
            "pk": 0,
            "username": "usename",
            "email": "example@mail.com",
            "first_name": "First",
            "last_name": "Last"
        }
     */

    dispatch(setUser(userData));
  } catch (error) {
    console.error("Google Social Auth Error:", error);
  }
}
