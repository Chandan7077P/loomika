"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion"; // ✅ Add this at top

interface Product {
  title: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    title: "Shrimps",
    description: "Fresh wild-caught shrimp.",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20HOSO%20Bl.jpg",
  },
  {
    title: "Vannamei",
    description: "Premium vannamei shrimps.",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20Fresh.jpg",
  },
  {
    title: "Fish",
    description: "Premium quality fish.",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Seabass%20(Lates%20calcarifer).JPG",
  },
  {
    title: "Squid",
    description: "Tender calamari squid.",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Squid%20Whole%20(Loligo%20Sp).jpg",
  },
  {
    title: "Farmed BT",
    description: "Delicious farmed shrimps.",
    image:
      "https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Farmed%20BT%202.JPG",
  },
];

const fadeInVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut, // ✅ Proper easing function
    },
  },
};

const OProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      className="py-20 container max-w-7xl mx-auto px-2 sm:px-4 md:px-25"
      id="our-products"
    >
      <motion.h2
        className="text-3xl font-bold text-blue-900 mb-12 text-center"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Our Products
      </motion.h2>

      <motion.div
        className="relative flex items-center justify-center group"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Carousel */}
        <div className="overflow-hidden mx-2 sm:mx-4 md:mx-6 w-full">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group/card flex-shrink-0 w-64 sm:w-72 h-80 bg-blue-950 text-white rounded-xl mr-4 sm:mr-6 flex flex-col overflow-hidden relative border-2 border-blue-400"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                      sizes="(max-width: 640px) 100vw, 288px"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center transition-transform duration-500 group-hover/card:-translate-y-4">
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <p className="text-sm text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-10"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="pointer-events-auto -ml-12">
            <button
              onClick={scrollPrev}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/50 text-white backdrop-blur-md transition duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="pointer-events-auto -mr-12">
            <button
              onClick={scrollNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/50 text-white backdrop-blur-md transition duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OProducts;
