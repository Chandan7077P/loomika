'use client'

import React, { useCallback, useRef } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { motion, useInView, Variants } from 'framer-motion'

const products = [
  {
    title: 'Shrimps',
    description: 'Fresh wild-caught shrimp.',
    image: 'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20HOSO%20Bl.jpg',
  },
  {
    title: 'Vannamei',
    description: 'Premium vannamei shrimps.',
    image: 'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20Fresh.jpg',
  },
  {
    title: 'Fish',
    description: 'Premium quality fish.',
    image: 'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Seabass%20(Lates%20calcarifer).JPG',
  },
  {
    title: 'Squid',
    description: 'Tender calamari squid.',
    image: 'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Squid%20Whole%20(Loligo%20Sp).jpg',
  },
  {
    title: 'Farmed BT',
    description: 'Delicious farmed shrimps.',
    image: 'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Farmed%20BT%202.JPG',
  },
]

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const OProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, {
    margin: '-30% 0px -30% 0px',
  })

  const groupRef = useRef(null)
  const groupInView = useInView(groupRef, {
    margin: '-25% 0px -25% 0px',
  })

  return (
    <motion.section
      id='our-products'
      ref={sectionRef}
      className='py-20 container max-w-7xl mx-auto px-2 sm:px-4 md:px-25'
      initial={{ opacity: 0, y: 80 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h2
        className='text-3xl font-bold text-blue-900 mb-12 text-center'
        initial={{ opacity: 0, y: 80 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Our Products
      </motion.h2>

      <div className='relative flex items-center justify-center group'>
        {/* Left Arrow */}
        <motion.button
          onClick={scrollPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='hidden md:flex items-center justify-center absolute -left-12 z-10 w-12 h-12 rounded-full bg-blue-950/50 text-white backdrop-blur-md transition duration-300'
        >
          <ChevronLeftIcon className='w-6 h-6' />
        </motion.button>

        {/* Carousel */}
        <div className='overflow-hidden mx-2 sm:mx-4 md:mx-6' ref={emblaRef}>
          <motion.div
            ref={groupRef}
            className='flex'
            variants={groupVariants}
            initial='hidden'
            animate={groupInView ? 'visible' : 'hidden'}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className='
                  group/card flex-shrink-0 w-64 sm:w-72 h-80
                  bg-blue-950 text-white rounded-xl
                  mr-4 sm:mr-6 flex flex-col overflow-hidden relative
                  border-2 border-blue-400
                '
              >
                {product.image && (
                  <div className='relative w-full h-full'>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover/card:scale-110'
                      sizes='(max-width: 640px) 100vw, 288px'
                      priority={index === 0}
                    />
                    <div className='absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-black to-transparent' />
                  </div>
                )}

                <div className='absolute bottom-0 left-0 w-full p-4 flex flex-col items-center transition-transform duration-500 group-hover/card:-translate-y-4'>
                  <h3 className='text-xl font-semibold'>{product.title}</h3>
                  <p className='text-sm text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500'>
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={scrollNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='hidden md:flex items-center justify-center absolute -right-12 z-10 w-12 h-12 rounded-full bg-blue-950/50 text-white backdrop-blur-md transition duration-300'
        >
          <ChevronRightIcon className='w-6 h-6' />
        </motion.button>
      </div>
    </motion.section>
  )
}

export default OProducts
