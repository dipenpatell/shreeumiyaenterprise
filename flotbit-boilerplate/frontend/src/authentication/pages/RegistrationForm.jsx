import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../../common/components/ui/input";
import { MicrosoftIcon } from "../../assets/icons/svgs";
import { Button } from "../../common/components/ui/button";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton";
import FacebookSignInButton from "../components/FacebookSignInButton";
import { detailedAuth } from "../services/apiHelper";
import { setError, setLoading } from "../authSlice";
import Preloader from "../components/Preloader";

/**
 * Path
 *  /auth/register
 *
 * Parents
 *  - routes
 * 
 * Renders
 *  registration page with form, Google, facebook, microsoft
 */

function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(setLoading(true))

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError({ genral: ["Please fill in all required fields."] });
      dispatch(setLoading(false));
      return;
    }

    if (password !== confirmPassword) {
      setFormError({ genral: ["Passwords do not match."] });
      dispatch(setLoading(false));
      return;
    }

    // Clear error and handle registration logic
    dispatch(setError(null));
    setFormError(null);
    // alert("Registering:", { firstName, lastName, email, password })
    detailedAuth(
      "/users/auth/registration/",
      {
        first_name: firstName,
        last_name: lastName,
        mobile_number: mobileNumber,
        email: email,
        username: email,
        password1: password,
        password2: confirmPassword,
      },
      dispatch
    );
  };

  const handleTel = (e, setValue) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setValue(value);
    }
  };

  return (
    <div className="h-screen w-full relative flex flex-1 flex-col items-center">
      {auth.loading === true && <Preloader /> }
      <div className="font-bold text-center max-md:pt-[1.5em] md:pt-[2.5em] text-3xl mb-3">
        Registration
      </div>
      <div className="font-bold text-center text-[var(--text-color-light)]">
        Enter your details to register
      </div>
      <form
        className="mt-7 flex flex-col w-full mb-[30px] items-center px-7 md:max-w-[400px]"
        onSubmit={handleRegister}
      >
        <div className="flex w-full mb-6 gap-4">
          <InputField
            type="text"
            placeholder="Frist Name*"
            value={firstName}
            onchange={(e) => setFirstName(e.target.value)}
            style={null}
            className={"flex-1"}
            error={
              auth.error?.first_name &&
              auth.error.first_name.map((err) => <>{err + " "}</>)
            }
          />
          <InputField
            type="text"
            placeholder="Last Name*"
            value={lastName}
            onchange={(e) => setLastName(e.target.value)}
            style={null}
            className={"flex-1"}
            error={
              auth.error?.last_name &&
              auth.error?.last_name.map((err, i) => <>{err + " "}</>)
            }
          />
        </div>
        <InputField
          type="tel"
          placeholder="Mobile Number*"
          value={mobileNumber}
          onchange={(e) => handleTel(e, setMobileNumber)}
          style={null}
          className={"mb-6 w-full"}
          error={
            auth.error?.mobile_number &&
            auth.error?.mobile_number.map((err, i) => <>{err + " "}</>)
          }
        />
        <InputField
          type="email"
          placeholder="Email*"
          value={email}
          onchange={(e) => setEmail(e.target.value)}
          style={null}
          className={"mb-6 w-full"}
          error={
            auth.error?.email &&
            auth.error?.email.map((err, i) => <>{err + " "}</>)
          }
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          style={null}
          className={"mb-6 w-full"}
          error={
            auth.error?.password1 &&
            auth.error?.password1.map((err, i) => <>{err + " "}</>)
          }
        />
        <InputField
          type="password"
          placeholder="Confirm Password*"
          value={confirmPassword}
          onchange={(e) => setConfirmPassword(e.target.value)}
          className={"mb-[55px] w-full"}
          error={
            auth.error?.password2 &&
            auth.error?.password2.map((err, i) => <>{err + " "}</>)
          }
        />

        <Button
          variant="primary"
          label={"Sign up"}
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
        <div className="text-center text-red-500 rounded-sm px-2 py-1 bg-red-100 mb-3 md:max-w-[400px]">
          {auth.error?.genral.map((err, i) => (
            <>{err + " "}</>
          ))}
        </div>
      )}
      {auth.error?.non_field_errors && (
        <div className="text-center text-red-500 rounded-sm px-2 py-1 bg-red-100 mb-3 md:max-w-[400px]">
          {auth.error.non_field_errors.map((err, i) => (
            <>{err + " "}</>
          ))}
        </div>
      )}
      <div className="flex items-center w-full px-7 text-[#8080808C]  md:max-w-[400px]">
        <div className="h-[2px] bg-[#8080808C] flex-1"></div>
        <div className="mx-[10px]">Or</div>
        <div className="h-[2px] bg-[#8080808C] flex-1"></div>
      </div>

      <div className="flex items-center justify-center gap-[35px] mt-[30px] w-full text-[#8080808C] md:max-w-[400px]">
        <GoogleSignInButton />
        <FacebookSignInButton />
        <OAuthButton label={"Microsoft"} icon={<MicrosoftIcon />} />
      </div>

      <div className="flex flex-col max-md:pb-7 mt-[3em] items-center justify-center w-full  md:max-w-[400px]">
        <div className="flex justify-center">
          <div>Already account?</div>
          <a
            className="ml-1 font-bold text-[var(--primary-color)] cursor-pointer"
            onClick={() => navigate("/auth/login")}
            href="#"
          >
            {"Sign In"}
          </a>
        </div>
      </div>
    </div>
  );
}

export function OAuthButton({ icon, label, onclick }) {
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={onclick}
    >
      <div className="bg-[#E4E4E4] p-[18px] rounded-[50%] mb-[6px] font-medium">
        {icon}
      </div>
      <div className="text-center text-[var(--text-color-light)]">{label}</div>
    </div>
  );
}

export default RegistrationForm;
