import React from "react";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fullscreen background video from provided link */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/hl-shrimp-video.mp4"
      />

      {/* Optional overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full bg-black/40 text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore the Catch
          </h1>
          <p className="text-lg md:text-xl">
            Experience the elegance of wild caught shrimps in motion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
