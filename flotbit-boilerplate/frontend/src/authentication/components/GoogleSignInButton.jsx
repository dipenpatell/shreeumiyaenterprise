import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import { GoogleIcon } from "../../assets/icons/svgs";
import { googleSocialAuth } from "../services/socialAuth";
import { setError, setLoading } from "../authSlice";


/**
 * Parents
 *  - LoginForm
 *  - RegistrationForm
 * 
 * Renders
 *  Google login button
 */


export default function GoogleSignInButton() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Button />
    </GoogleOAuthProvider>
  );
}

function Button() {

  const dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleSocialAuth(tokenResponse.access_token, dispatch)
    },
    onError: () => {
      dispatch(setError("Login failed"));
      console.error("Login failed");
      dispatch(setLoading(false))
    },
  });
  const handleGoogleSignIn = async () => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    try {
      await login(); // this will throw if popup is closed or something fails
    } catch (err) {
      console.error("Google login error:", err);
      dispatch(setError("Login cancelled or failed"));
      dispatch(setLoading(false));
    }
  };

  return (
    <button
      className="flex flex-col items-center justify-center"
      onClick={handleGoogleSignIn}
    >
      <div className="bg-[#E4E4E4] p-[18px] rounded-[50%] mb-[6px] font-medium">
        <GoogleIcon />
      </div>
      <div className="text-center text-[var(--text-color-light)]">Google</div>
    </button>
  );
}
