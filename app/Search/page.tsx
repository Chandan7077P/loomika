import React, { Suspense } from 'react';
import SearchClient from './SearchClient';

export const dynamic = 'force-dynamic'; // Optional, helps avoid SSR issues

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading search results...</div>}>
      <SearchClient />
    </Suspense>
  );
}
