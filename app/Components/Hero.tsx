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
              Experience the elegance of wild caught shrimps in motion from
              Kochi, Kerala.
            </p>
            <div className='flex flex-row gap-4 sm:gap-8 items-center justify-center'>
              <Link
                href='#our-products'
                className='group relative inline-block w-fit md:w-auto text-white font-semibold text-lg md:text-xl transition-colors pb-2'
              >
                <span className='block transition-transform duration-300 ease-out group-hover:-translate-y-2'>
                  View Products
                </span>
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-900'></span>
              </Link>

              <Link
                href='#contact-us'
                className='group relative inline-block w-fit md:w-auto text-white font-semibold text-lg md:text-xl transition-colors pb-2'
              >
                <span className='block transition-transform duration-300 ease-out group-hover:-translate-y-2'>
                  Contact Us
                </span>
                <span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-900'></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
