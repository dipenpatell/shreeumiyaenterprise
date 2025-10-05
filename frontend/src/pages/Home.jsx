import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomeContent from "./components/HomeContent";

const Home = () => {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("/medias.json") // ✅ loads from public folder
      .then((res) => res.json())
      .then((data) => setVideoSrc(data.videos.home_reel_1.src));
  }, []);

  // Handle video load
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {videoSrc && (
            <video
              ref={videoRef}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMF8xKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzBfMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMTkyMCIgeTI9IjEwODAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNkI2QiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0VGNDQ0NCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGQkJGMjQiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
            >
              {/* Multiple video sources for better compatibility */}
              <source src={videoSrc} type="video/mp4" />
              {/* <source src="/TheLion.mp4" type="video/mp4" /> */}
              Your browser does not support the video tag.
            </video>
          )}

          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>

        {/* Loading State */}
        <div
          className={`${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          } transition-opacity duration-700 ease-in-out absolute inset-0 [background:linear-gradient(135deg,_#05364d_0%,_#0a5d7a_35%,#1a8fb8_100%)] bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 flex items-center justify-center`}
        >
          <div class="background-pattern"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[#05364d] via-[#1a8fb8] to-[#0a5d7a] bg-clip-text text-transparent animate-pulse">
                CAPTURE
              </span>
              <span className="block text-white mt-2">MOMENTS</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Professional photography that tells your unique story through
              light, emotion, and artistry
            </p>

            {/* CTA Buttons */}
            <div className="hidden flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact-us")}
                className="px-8 py-4 [background:var(--primary-gradient)] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Contact US
              </button>
              <button
                onClick={() => navigate("/portfolio")}
                className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm bg-white/20 border-2 border-white border-opacity-30 text-white font-semibold rounded-full hover:bg-opacity-20 hover:scale-105 transition-all duration-300"
              >
                Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            {/* <span className="text-sm mb-2 opacity-75">Scroll to explore</span> */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
      <HomeContent />
    </div>
  );
};

export default Home;
