"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion, easeOut } from "framer-motion";

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
      ease: easeOut,
    },
  },
};

const OProducts: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section
      className="py-20 max-w-7xl mx-auto px-6 sm:px-12"
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

      {/* Carousel container with relative wrapper */}
      <motion.div
        className="relative"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Carousel */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="embla__container flex">
            {products.map((product, index) => (
              <div
                key={index}
                className="group/card flex-[0_0_auto] w-64 sm:w-72 h-80 bg-blue-950 text-white rounded-xl relative overflow-hidden border-2 border-blue-400 mx-3"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                    sizes="(min-width: 640px) 288px, 256px"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center transition-transform duration-500 group-hover/card:-translate-y-4 z-10">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-sm text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons positioned over the carousel */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
          <div className="pointer-events-auto -ml-8">
            <button
              onClick={scrollPrev}
              aria-label="Scroll to previous product"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/90 text-white backdrop-blur-md transition duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="pointer-events-auto -mr-8">
            <button
              onClick={scrollNext}
              aria-label="Scroll to next product"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/90 text-white backdrop-blur-md transition duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OProducts;
