'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const Search = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className='min-h-screen bg-white px-6 py-12 text-gray-800'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Search Results</h1>

        {query ? (
          <p className='text-lg mb-8'>
            Showing results for{' '}
            <span className='font-medium text-blue-700'>`{query}`</span>
          </p>
        ) : (
          <p className='text-lg mb-8 text-gray-500'>
            Start typing in the search bar above to see results.
          </p>
        )}

        {/* Dummy product grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className='aspect-[3/4] bg-gray-100 rounded-xl shadow-inner flex items-center justify-center text-sm text-gray-500'
            >
              Product {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
