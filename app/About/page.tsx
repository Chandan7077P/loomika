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

const AboutDemo: React.FC = () => {
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
            alt='about-baby-marine-international-kochi-kerela-india'
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
        <h2 className='text-4xl font-bold text-blue-950'>About Us</h2>
      </motion.div>

      {/* Content Section */}
      <div className='max-w-6xl mx-auto px-4 mb-16'>
        <motion.div
          className='space-y-8 text-gray-700 leading-relaxed'
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <p>
            Baby Marine International is a pioneer in the Indian seafood export
            industry, with a legacy spanning over four decades. Headquartered in
            Kochi, Kerala, we specialize in the procurement, processing, and
            export of premium quality seafood to global markets.
          </p>

          <p>
            With state-of-the-art facilities, a commitment to sustainability,
            and an unwavering focus on quality, we cater to customers across
            Europe, the USA, and Southeast Asia. Our vertically integrated
            supply chain ensures traceability, freshness, and adherence to
            international food safety standards.
          </p>

          <p>
            Our team of experts, from sourcing to shipping, works closely to
            deliver excellence in every shipment. We take pride in supporting
            local fishing communities and promoting responsible aquaculture
            practices.
          </p>

          <p>
            At Baby Marine, we don’t just deliver seafood; we deliver trust,
            quality, and a commitment to the ocean’s bounty. Join us on our
            journey toward a sustainable and thriving seafood future.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutDemo
