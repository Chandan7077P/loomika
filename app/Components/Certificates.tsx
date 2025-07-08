"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface Certificate {
  id: number;
  title: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "HACCP Certified",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/haacp.avif",
  },
  {
    id: 2,
    title: "BRC Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/brc-food-certificated-logo-vector.png",
  },
  {
    id: 3,
    title: "ISO 22000",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/iso-22000-2018-certification-service.jpeg",
  },
  {
    id: 4,
    title: "BRC Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/brc-food-certificated-logo-vector.png",
  },
  {
    id: 5,
    title: "HACCP Certified",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/haacp.avif",
  },
  {
    id: 6,
    title: "BRC Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/brc-food-certificated-logo-vector.png",
  },
  {
    id: 7,
    title: "ISO 22000",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/iso-22000-2018-certification-service.jpeg",
  },
  {
    id: 8,
    title: "BRC Certified",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/brc-food-certificated-logo-vector.png",
  },
];

const tickerCertificates = [...certificates, ...certificates, ...certificates];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Certificates: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      className="py-20 max-w-6xl mx-auto px-4"
      id="certificates"
    >
      <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
        Our Certifications
      </h2>

      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Ticker container */}
        <div className="ticker-container">
          <div className="ticker-content">
            {tickerCertificates.map((cert, idx) => (
              <motion.div
                key={`${cert.id}-${idx}`}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="ticker-item bg-white rounded-xl p-6"
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
                <p className="text-base text-blue-900 text-center font-semibold">
                  {cert.title}
                </p>
              </motion.div>
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
          animation: scroll 30s linear infinite;
          gap: 1rem;
        }

        .ticker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 160px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        @media (min-width: 768px) {
          .ticker-content {
            gap: 0.5rem;
          }

          .ticker-item {
            min-width: 240px;
          }
        }

        .ticker-item:hover {
          transform: translateY(-5px);
        }

        .ticker-container:hover .ticker-content {
          animation-play-state: paused;
        }

        @media (max-width: 767px) {
          .ticker-container:hover .ticker-content {
            animation-play-state: running;
          }
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
    </motion.section>
  );
};

export default Certificates;
