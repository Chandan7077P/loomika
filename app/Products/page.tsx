'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  Variants,
  easeOut,
  useScroll,
  useTransform,
} from 'framer-motion'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
}

const dummyProducts = [
  {
    id: 1,
    name: 'Fresh Vannamei Shrimp',
    description:
      'Premium quality farm-raised Vannamei shrimp, frozen and packed fresh.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20Fresh.jpg',
  },
  {
    id: 2,
    name: 'Whole Squid (Loligo)',
    description: 'Fresh whole squid, perfect for grilling or stuffing.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Squid%20Whole%20(Loligo%20Sp).jpg',
  },
  {
    id: 3,
    name: 'Black Tiger Shrimp',
    description:
      'Naturally grown Black Tiger shrimp with firm texture and bold flavor.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Farmed%20BT%202.JPG',
  },
  {
    id: 4,
    name: 'Cuttlefish',
    description: 'Frozen cuttlefish processed under hygienic conditions.',
    image:
      'https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/Vannamei%20Fresh.jpg',
  },
]

const ProductsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div ref={heroRef} className='relative w-full h-80 overflow-hidden mb-12'>
        <motion.div
          className='absolute inset-0 w-full h-[120%] -top-[10%]'
          style={{ y: parallaxY }}
        >
          <Image
            src='https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/contact-us-banner.jpg'
            alt='products-baby-marine-international'
            fill
            className='object-cover'
            priority
          />
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        className='max-w-6xl mx-auto px-4 mb-10'
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h2 className='text-4xl font-bold text-blue-950'>Our Products</h2>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className='max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-16'
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className='bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300'
          >
            <div className='relative w-full h-56'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className='object-cover'
              />
            </div>
            <div className='p-4'>
              <h2 className='text-lg font-semibold text-blue-900'>
                {product.name}
              </h2>
              <p className='text-gray-600 text-sm mt-2'>
                {product.description}
              </p>
              <button className='mt-4 px-4 py-2 bg-blue-950 hover:bg-blue-800 text-white text-sm font-medium rounded-full'>
                View Details
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductsPage
