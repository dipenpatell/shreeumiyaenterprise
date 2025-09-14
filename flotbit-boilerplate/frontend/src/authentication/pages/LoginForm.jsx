import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MicrosoftIcon } from "../../assets/icons/svgs";
import GoogleSignInButton from "../components/GoogleSignInButton";
import FacebookSignInButton from "../components/FacebookSignInButton";
import { setError, setLoading } from "../authSlice";
import InputField from "../../common/components/ui/input";
import { MailIcon, PasswordIcon } from "../../assets/icons/svgs";
import { Button } from "../../common/components/ui/button";
import { useNavigate } from "react-router-dom";
import { OAuthButton } from "./RegistrationForm";
import { detailedAuth } from "../services/apiHelper";
import Preloader from "../components/Preloader";


/**
 * Path
 *  /auth/login
 * 
 * Parents
 *  - routes
 * 
 * Renders
 *  Login page with form, Google, facebook, microsoft
 */


export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!email || !password) {
      setFormError({ genral: ["Please fill in all required fields."] });
      dispatch(setLoading(false));
      return;
    }

    // Clear error and handle registration logic
    setFormError(null);
    dispatch(setError(null));
    // alert("Registering:", { firstName, lastName, email, password })
    detailedAuth(
      "/users/auth/login/",
      {
        username: email,
        password: password,
      },
      dispatch
    );
  };

  return (
    <div className="flex flex-col h-screen w-full relative">
      {auth.loading === true && <Preloader /> }
      <div className={`relative w-full h-[13em]`}>
        <div
          className="absolute"
          style={{
            background: "radial-gradient(#007AFF, transparent)",
            borderRadius: "50%",
            height: "22em",
            width: "100%",
            filter: "blur(34px)",
            transform: "translate(-0%, -50%)",
          }}
        ></div>
        <span
          className="text-3xl w-full text-center text-white absolute z-2"
          style={{
            transform: "translate(0%, 250%)",
          }}
        >
          flobit
        </span>
      </div>
      <div className="pt-[2em] flex flex-1 flex-col items-center">
        <div className="font-bold text-center text-3xl mb-3">Hello Again!</div>
        <div className="font-bold text-center text-[var(--text-color-light)] w-[180px]">
          Welcome back, You’ve been missed!
        </div>
        <form
          className="mt-7 flex flex-col w-full mb-[30px] items-center px-7 md:max-w-[400px]"
          onSubmit={handleLogin}
        >
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            icon={<MailIcon />}
            onchange={(e) => setEmail(e.target.value)}
            style={null}
            className={"mb-6 w-full"}
            error={
              auth.error?.email &&
              auth.error.email.map((err) => <>{err + " "}</>)
            }
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            icon={<PasswordIcon />}
            onchange={(e) => setPassword(e.target.value)}
            style={null}
            className={"mb-6 w-full"}
            error={
              auth.error?.first_name &&
              auth.error.first_name.map((err) => <>{err + " "}</>)
            }
          />
          <a
            className="text-right w-full font-bold text-[var(--light-dark-color)] mb-[35px]"
            href="#"
          >
            Forgot Password?
          </a>

          <Button
            variant="primary"
            label={"Sign in"}
            className={"w-full"}
            onclick={() => null}
            type="submit"
          />
        </form>
        {formError?.genral && (
          <div className="text-center text-red-500 rounded-sm px-2 py-1 bg-red-100 mb-3">
            {formError?.genral.map((err, i) => (
              <>{err + " "}</>
            ))}
          </div>
        )}
        {auth.error?.genral && (
          <div className="text-center text-red-500 rounded-sm px-2 py-1 bg-red-100 mb-3">
            {auth.error?.genral.map((err, i) => (
              <>{err + " "}</>
            ))}
          </div>
        )}
        {auth.error?.non_field_errors && (
          <div className="text-center text-red-500 rounded-sm px-2 py-1 bg-red-100 mb-3">
            {auth.error.non_field_errors.map((err, i) => (
              <>{err + " "}</>
            ))}
          </div>
        )}
        <div className="flex items-center w-full text-[#8080808C] px-7 md:max-w-[400px]">
          <div className="h-[2px] bg-[#8080808C] flex-1"></div>
          <div className="mx-[10px]">Or</div>
          <div className="h-[2px] bg-[#8080808C] flex-1"></div>
        </div>

        <div className="flex items-center justify-center gap-[35px] mt-[30px] w-full text-[#8080808C] md:max-w-[400px]">
          <GoogleSignInButton />
          <FacebookSignInButton />
          <OAuthButton label={"Microsoft"} icon={<MicrosoftIcon />} />
        </div>
        <div className="flex max-md:pb-2 mt-[3em] justify-center w-full">
          <div>Don’t have an account?</div>
          <a
            className="ml-1 font-bold text-[var(--primary-color)]"
            href="#"
            onClick={() => navigate("/auth/register")}
          >
            {" Register Now"}
          </a>
        </div>
      </div>
    </div>
  );
}
