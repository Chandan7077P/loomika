'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    title: 'Advanced Processing Technology',
    description:
      'Our facility in Kochi is equipped with the latest processing technology, ensuring the highest standards of quality and food safety.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Advanced%20Processing%20Technology.jpg',
  },
  {
    title: 'Strict Quality Control',
    description:
      'We follow strict quality control measures to ensure the safety and freshness of our products.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Strict%20quality%20control.webp',
  },
  {
    title: 'Expert Team',
    description:
      'Our team of experienced professionals is dedicated to delivering top-notch products that meet the highest standards of quality and food safety.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Expert%20Team%20crop.jpg',
  },
];

const OFacility = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate Title
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 80 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // Animate Top Card
    if (topCardRef.current) {
      gsap.set(topCardRef.current, { opacity: 0, y: 80 });
      gsap.to(topCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: topCardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // Animate Bottom Cards Wrapper Together
    if (bottomCardsWrapperRef.current) {
      gsap.set(bottomCardsWrapperRef.current, { opacity: 0, y: 80 });
      gsap.to(bottomCardsWrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bottomCardsWrapperRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="py-20 container max-w-full mx-auto px-2 bg-black/10 backdrop-blur-md sm:px-4 md:px-8">
      <h2
        ref={titleRef}
        className="text-3xl font-bold text-blue-900 mb-12 text-center"
      >
        Why Choose Us
      </h2>

      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
        {/* Top Card */}
        <div
          ref={topCardRef}
          className="group/card relative w-full rounded-xl overflow-hidden shadow-lg mb-6"
        >
          {/* Mobile */}
          <div className="block sm:hidden relative w-full h-60">
            <Image
              src={facilities[0].image}
              alt={facilities[0].title}
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold">
              {facilities[0].title}
            </div>
          </div>

          {/* Tablet */}
          <div className="hidden sm:flex lg:hidden flex-row items-stretch bg-white rounded-xl overflow-hidden">
            <div className="relative w-1/2 min-h-[200px]">
              <Image
                src={facilities[0].image}
                alt={facilities[0].title}
                fill
                className="object-cover rounded-l-xl"
                priority
              />
            </div>
            <div className="w-1/2 px-5 py-4 flex flex-col justify-center rounded-r-xl">
              <h3 className="text-lg font-semibold text-blue-900">
                {facilities[0].title}
              </h3>
              <p className="text-sm text-gray-700 mt-0">
                {facilities[0].description}
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block relative w-full h-120">
            <Image
              src={facilities[0].image}
              alt={facilities[0].title}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-110 rounded-xl"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent rounded-b-xl" />
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center transition-transform duration-500 group-hover/card:-translate-y-4">
              <h3 className="text-xl font-semibold text-white mb-1 leading-tight">
                {facilities[0].title}
              </h3>
              <p className="text-base text-white opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                {facilities[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div
          ref={bottomCardsWrapperRef}
          className="grid gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {/* Bottom Left Card */}
          <div className="group/card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
            {/* Desktop */}
            <div className="hidden lg:block relative w-full h-80">
              <Image
                src={facilities[1].image}
                alt={facilities[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover/card:scale-110 rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent rounded-b-xl" />
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center transition-transform duration-500 group-hover/card:-translate-y-4">
                <h3 className="text-xl font-semibold text-white mb-1 leading-tight">
                  {facilities[1].title}
                </h3>
                <p className="text-base text-white opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                  {facilities[1].description}
                </p>
              </div>
            </div>

            {/* Tablet */}
            <div className="hidden sm:flex lg:hidden flex-row items-stretch">
              <div className="relative w-1/2 min-h-[200px]">
                <Image
                  src={facilities[1].image}
                  alt={facilities[1].title}
                  fill
                  className="object-cover rounded-l-xl"
                />
              </div>
              <div className="w-1/2 px-5 py-4 flex flex-col justify-center rounded-r-xl">
                <h3 className="text-lg font-semibold text-blue-900">
                  {facilities[1].title}
                </h3>
                <p className="text-sm text-gray-700 mt-0">
                  {facilities[1].description}
                </p>
              </div>
            </div>

            {/* Mobile */}
            <div className="block sm:hidden relative w-full h-60">
              <Image
                src={facilities[1].image}
                alt={facilities[1].title}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold">
                {facilities[1].title}
              </div>
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="group/card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
            {/* Desktop */}
            <div className="hidden lg:block relative w-full h-80">
              <Image
                src={facilities[2].image}
                alt={facilities[2].title}
                fill
                className="object-cover transition-transform duration-500 group-hover/card:scale-110 rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent rounded-b-xl" />
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center text-center transition-transform duration-500 group-hover/card:-translate-y-4">
                <h3 className="text-xl font-semibold text-white mb-1 leading-tight">
                  {facilities[2].title}
                </h3>
                <p className="text-base text-white opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                  {facilities[2].description}
                </p>
              </div>
            </div>

            {/* Tablet */}
            <div className="hidden sm:flex lg:hidden flex-row items-stretch">
              <div className="relative w-1/2 min-h-[200px]">
                <Image
                  src={facilities[2].image}
                  alt={facilities[2].title}
                  fill
                  className="object-cover rounded-l-xl"
                />
              </div>
              <div className="w-1/2 px-5 py-4 flex flex-col justify-center rounded-r-xl">
                <h3 className="text-lg font-semibold text-blue-900">
                  {facilities[2].title}
                </h3>
                <p className="text-sm text-gray-700 mt-0">
                  {facilities[2].description}
                </p>
              </div>
            </div>

            {/* Mobile */}
            <div className="block sm:hidden relative w-full h-60">
              <Image
                src={facilities[2].image}
                alt={facilities[2].title}
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold">
                {facilities[2].title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OFacility;
