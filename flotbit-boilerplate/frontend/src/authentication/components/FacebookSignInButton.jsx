import { useEffect } from "react";
import { FacebookIcon } from "../../assets/icons/svgs";
import { facebookSocialAuth } from "../services/socialAuth";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../authSlice";

/**
 * Parents
 *  - LoginForm
 *  - RegistrationForm
 * 
 * Renders
 *  Facebook login button
 */

export default function FacebookSignInButton() {

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0", // Or latest supported
      });
    };

    // Inject SDK script if not already loaded
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(script);
    }
  }, []);
  const dispatch = useDispatch();

  const handleFacebookSignIn = () => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    FB.login(
      function (response) {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          facebookSocialAuth(accessToken, dispatch)
        } else {
          console.error("Facebook login failed! with authResponse ", response.authResponse, " and status ", response.status);
          dispatch(setError({"genral": ["Facebook Login failed"]}));
        }
        dispatch(setLoading(false));
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <button
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={handleFacebookSignIn}
    >
      <div className="bg-[#E4E4E4] p-[18px] rounded-[50%] mb-[6px] font-medium">
        <FacebookIcon />
      </div>
      <div className="text-center text-[var(--text-color-light)]">Facebook</div>
    </button>
  );
}
