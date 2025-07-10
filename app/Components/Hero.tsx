'use client'

import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from 'framer-motion'

// Animation containers
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

// Rotating search keywords
const keywords = ['Dresses', 'Sarees', 'Shirts', 'Kurtis', 'Dress Piece']

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [index, setIndex] = useState(0)

  const currentKeyword = keywords[index]

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section>
      <div
        ref={sectionRef}
        className='relative w-full h-screen overflow-hidden'
      >
        {/* 🔍 Clickable Animated Search Bar */}
        <div
          className='absolute top-6 left-1/2 -translate-x-1/2 z-20 w-11/12 sm:w-2/3 md:w-1/2 cursor-pointer'
          onClick={() => router.push('/Search')}
        >
          <div className='flex items-center bg-transparent border border-white/60 rounded-full px-4 py-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-white mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z'
              />
            </svg>

            <span className='text-white text-sm opacity-70 flex items-center h-[22px] overflow-hidden'>
              Search products…
              <AnimatePresence mode='wait'>
                <motion.span
                  key={currentKeyword}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className='ml-2 text-white'
                >
                  {currentKeyword}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* 🌄 Background with Parallax Effect */}
        <motion.div
          className='absolute top-0 left-0 w-full h-full'
          style={{ y: parallaxY }}
        >
          <Image
            src='https://cdn.jsdelivr.net/gh/AiChandan007/loomika-Assets@main/Loomika%20Hero%201.jpg'
            alt='Loomika Hero'
            fill
            className='object-cover object-center'
            priority
          />
          <div className='absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.4)_100%)]' />
          <div className='absolute inset-0 pointer-events-none z-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
        </motion.div>

        {/* ✨ Hero Text Content */}
        <div className='relative z-10 flex items-end justify-center h-full bg-black/40 text-white text-center px-4 pb-28'>
          <motion.div
            className='flex flex-col items-center'
            variants={container}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <motion.h1
              className='text-3xl md:text-3xl font-bold mb-4'
              variants={fadeInUp}
            >
              Tradition Meets Style
            </motion.h1>
            <motion.p
              className='text-base md:text-base mb-8'
              variants={fadeInUp}
            >
              Bold. Beautiful. Handwoven. Loomika’s Sambalpuri styles bring
              tradition to modern fashion with heart.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
