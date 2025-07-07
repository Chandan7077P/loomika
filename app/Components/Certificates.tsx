"use client";

import React from "react";
import Image from "next/image";

interface Certificate {
  id: number;
  title: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "HACCP Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 2,
    title: "FDA Approved",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 3,
    title: "ISO 22000",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 4,
    title: "GMP Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 5,
    title: "EU Standards",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
];

// Create multiple copies for seamless loop
const tickerCertificates = [...certificates, ...certificates, ...certificates];

const Certificates: React.FC = () => {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
        Our Certificates
      </h2>

      <div className="relative overflow-hidden">
        {/* Gradient masks for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Ticker container */}
        <div className="ticker-container">
          <div className="ticker-content">
            {tickerCertificates.map((cert, idx) => (
              <div
                key={`${cert.id}-${idx}`}
                className="ticker-item bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-40 h-40 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={140}
                    height={140}
                    className="object-contain max-w-full max-h-full rounded-lg"
                  />
                </div>
                <p className="text-base text-blue-900 text-center font-medium">
                  {cert.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-container {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll 20s linear infinite;
          gap: 0rem;
        }
        
        .ticker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 240px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .ticker-item:hover {
          transform: translateY(-5px);
        }
        
        .ticker-container:hover .ticker-content {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

export default Certificates;
