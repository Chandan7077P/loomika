"use client";

import React from "react";
import Image from "next/image";

// ✅ 1. Define a proper TypeScript interface
interface Certificate {
  id: number;
  title: string;
  image: string;
}

// ✅ 2. Declare the certificates array with proper type
const certificates: Certificate[] = [
  {
    id: 1,
    title: "HACCP Certified",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 2,
    title: "FDA Approved",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 3,
    title: "ISO 22000",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 4,
    title: "HACCP Certified",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
  {
    id: 5,
    title: "FDA Approved",
    image: "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg",
  },
];

const Certificates: React.FC = () => {
  return (
    <section className="py-20 container max-w-7xl mx-auto px-2 sm:px-4 md:px-25 overflow-hidden">
      <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
        Our Certificates
      </h2>

      {/* ✅ 3. Auto-scrolling container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-6">
          {certificates.map((cert: Certificate, idx: number) => (
            <div
              key={idx}
              className="min-w-[200px] flex-shrink-0 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center"
            >
              <Image
                src={cert.image}
                alt={cert.title}
                width={120}
                height={120}
                className="object-contain"
              />
              <p className="mt-4 text-blue-900 font-semibold text-center">
                {cert.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
