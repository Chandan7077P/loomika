'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// Parent container animation
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Individual item animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section>
      <div ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        {/* Parallax Background Video */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{ y: parallaxY }}
        >
          <video
            className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/hl-shrimp-video.mp4"
          />
        </motion.div>

        {/* Overlay Content */}
        <div className="relative z-10 flex items-center justify-center h-full bg-black/40 text-white text-center px-4">
          <motion.div
            className="flex flex-col items-center"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={fadeInUp}
            >
              Explore the Catch
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8"
              variants={fadeInUp}
            >
              Experience the elegance of wild caught shrimps in motion from
              Kochi, Kerala.
            </motion.p>

            <motion.div
              className="flex flex-row gap-4 sm:gap-8 items-center justify-center"
              variants={fadeInUp}
            >
              <Link
                href="#our-products"
                className="group relative inline-block w-fit md:w-auto text-white font-semibold text-lg md:text-xl transition-colors pb-2"
              >
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  View Products
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900"></span>
              </Link>

              <Link
                href="#contact-us"
                className="group relative inline-block w-fit md:w-auto text-white font-semibold text-lg md:text-xl transition-colors pb-2 ml-4"
              >
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  Contact Us
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
