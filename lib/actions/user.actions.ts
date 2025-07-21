'use server'

import User from '@/lib/modals/user.modal'
import { connect } from '@/lib/db'
// Removed: import { userAgent } from 'next/server' - as it's not relevant here

// Define a type for the user data you expect to receive
// This provides better type safety
interface CreateUserParams {
  clerkId: string
  email: string
  username: string
  photo: string
  firstName?: string // Optional fields
  lastName?: string // Optional fields
  planId?: string
  creditBalance?: number
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connect() // Ensure the database connection is established

    // Create the user using the Mongoose model
    const newUser = await User.create(userData)

    // It's good practice to serialize Mongoose documents before returning them
    // from server actions or API routes, especially for complex objects,
    // as they might contain non-JSON serializable properties.
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.error('Error creating user:', error)
    // Re-throw the error so the caller can handle it
    throw error
  }
}
