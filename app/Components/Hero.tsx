import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section>
      {/* Hero Section with Video */}
      <div className='relative w-full h-screen overflow-hidden'>
        <video
          className='absolute top-0 left-0 w-full h-full object-cover'
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          src='https://cdn.jsdelivr.net/gh/Chandan7077P/BMI-Assets/hl-shrimp-video.mp4'
        />

        <div className='relative z-10 flex items-center justify-center h-full bg-black/40 text-white text-center px-4'>
          <div>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              Explore the Catch
            </h1>
            <p className='text-lg md:text-xl mb-8'>
              Experience the elegance of wild caught shrimps in motion.
            </p>
            {/* Button with animated multicolor border */}
            <div className='relative inline-block p-[2px] rounded-full animated-border'>
              <Link
                href='/products'
                className='relative inline-block w-fit md:w-auto text-white font-semibold px-8 py-3 rounded-full bg-blue-950 hover:bg-blue-950 hover:text-cyan-400 transition-colors'
              >
                <span className='pop-zoom'>View Products</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Test Div */}
      <div className='py-20 bg-white text-center'>
        <h2 className='text-3xl font-semibold text-gray-800'>Our Products</h2>
        <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
          Discover our wide range of premium seafood, sustainably sourced and
          expertly processed to preserve freshness and flavor.
        </p>
      </div>
    </section>
  )
}

export default Hero
