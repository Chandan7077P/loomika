import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Sanity client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use `false` if you want fresh data always (e.g., ISR or revalidation)
})

// Optional helper for easier data fetching with types
export async function fetchSanityData<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params)
}
