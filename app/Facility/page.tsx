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

const FacilityPage: React.FC = () => {
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
            alt='our-facility-baby-marine-international'
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
        <h2 className='text-4xl font-bold text-blue-950'>Our Facility</h2>
      </motion.div>

      {/* Content */}
      <motion.div
        className='max-w-6xl mx-auto px-4 mb-16 space-y-8 text-gray-700 leading-relaxed'
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <p>
          Our state-of-the-art seafood processing facility is equipped with
          modern technologies, ensuring maximum hygiene, quality control, and
          food safety compliance.
        </p>
        <p>
          The facility includes automated freezing systems, cold storage,
          cutting and grading lines, as well as packaging units that meet
          international standards such as HACCP, BRC, and FDA.
        </p>
        <p>
          Located near the harbor, our infrastructure allows us to process fresh
          catch immediately, preserving taste, texture, and nutritional value.
        </p>
        <p>
          With a dedicated team of trained professionals and robust traceability
          systems, we ensure every shipment reflects our commitment to
          excellence.
        </p>
      </motion.div>
    </div>
  )
}

export default FacilityPage
