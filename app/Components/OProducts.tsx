'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const products = [
  { title: 'Shrimp', description: 'Fresh wild-caught shrimp.' },
  { title: 'Fish', description: 'Premium quality fish.' },
  { title: 'Squid', description: 'Tender calamari squid.' },
  { title: 'Crab', description: 'Delicious fresh crab.' },
  { title: 'Lobster', description: 'Premium lobster tails.' },
]

const OProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1, // Important: Only scroll one slide
    containScroll: 'trimSnaps', // Prevents overscrolling beyond edges
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className='py-20 container max-w-7xl mx-auto px-4 md:px-25 relative'>
      <h2 className='text-3xl font-bold text-blue-950 mb-12 text-center'>
        Our Products
      </h2>

      {/* Buttons */}
      <button
        onClick={scrollPrev}
        className='hidden md:inline-flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-950 text-white p-3 rounded-full hover:bg-blue-800'
      >
        <ChevronLeftIcon className='w-6 h-6' />
      </button>
      <button
        onClick={scrollNext}
        className='hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-950 text-white p-3 rounded-full hover:bg-blue-800'
      >
        <ChevronRightIcon className='w-6 h-6' />
      </button>

      {/* Embla Carousel */}
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {products.map((product, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-72 h-80 bg-blue-950 text-white rounded-xl p-6 mr-6'
            >
              <h3 className='text-xl font-semibold mb-2'>{product.title}</h3>
              <p className='text-sm text-center'>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OProducts
