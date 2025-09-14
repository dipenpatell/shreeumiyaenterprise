// src/features/auth/AuthPage.jsx
import {
  AuthPageObject,
} from "../assets/icons/svgs";
import React, { useState, useEffect } from "react";
import { Button } from "../common/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [blueFillActive, setBlueFillActive] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Start blue fill animation immediately
    setBlueFillActive(true);

    // Show text after 1 second
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 500);

    // Hide loading screen after 5 seconds
    const loadingTimer = setTimeout(() => {
      setShowLoading(false);

      // Show welcome page after loading screen starts fading
      setTimeout(() => {
        setShowWelcome(true);
      }, 300);
    }, 1500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--main-layout-bg)]">
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-500 ${
          showLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Blue Fill Animation */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-gradient-to-br from-blue-500 to-blue-700 transition-all duration-2000 ease-out ${
            blueFillActive ? "h-full" : "h-0"
          }`}
          style={{
            borderRadius: blueFillActive ? "0" : "50% 50% 0 0",
            transition: "height 1000ms ease-out, border-radius 1000ms ease-out",
          }}
        />

        {/* Flobit Text */}
        <div
          className={`relative z-10 text-6xl font-bold text-white transition-all duration-1000 ease-out ${
            textVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          flobit
        </div>
      </div>

      {/* Welcome Page */}

      <div className="flex flex-col h-full w-full relative overflow-auto">
        <div className={`relative w-full`}>
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

        {/* welcome */}
        <div className="mt-[13em] flex flex-1 flex-col items-center">
          <div className=" flex items-center justify-center mb-[30px] max-md:max-h-[280px]">
            <AuthPageObject style={{ width: "100%" }} />
          </div>
          <div className="px-5 text-black text-center text-3xl font-bold max-w-[400px]">
            Let’s create a space for your workFlos.
          </div>
          <div className="text-base mt-4 mb-[4em] text-zinc-400 text-center max-w-[300px] max-md:max-w-[170px]">
            Your dedicated space to streamline tasks, clarify processes, and
            boost productivity.
          </div>
          <div className="rounded-sm flex max-md:items-end max-md:flex-1 md:mt-[6em] max-md:mb-[4em] justify-center w-full max-md:px-7 md:max-w-[330px]">
            <div className="flex flex-1 rounded-[15px] shadow-[var(--outset-fb-shadow)]">
              <Button
                label={"Register"}
                style={{ boxShadow: "none", borderRadius: "8px 0 0 8px" }}
                className={"flex-1"}
                onclick={() => navigate("/auth/register")}
              />
              <Button
                label={"Sign in"}
                style={{ boxShadow: "none", borderRadius: "0 8px 8px 0" }}
                className={"flex-1"}
                onclick={() => navigate("/auth/login")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .duration-2000 {
          transition-duration: 2000ms;
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .text-6xl {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
