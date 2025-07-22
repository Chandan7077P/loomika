// lib/actions/user.actions.ts
// This file contains all the server actions for interacting with your User model.

'use server'

import User from '@/lib/modals/user.modal'
import { connect } from '@/lib/db'

// --- Type Definitions for Clarity and Safety ---

interface CreateUserParams {
  clerkId: string
  email: string
  username: string
  photo: string
  firstName?: string
  lastName?: string
}

interface UpdateUserParams {
  email: string
  username: string
  photo: string
  firstName?: string
  lastName?: string
}


// --- CREATE User ---
// Your provided createUser function. It's already correct.
export async function createUser(userData: CreateUserParams) {
  try {
    await connect() // Ensure the database connection is established

    const newUser = await User.create(userData)

    // Serialize the Mongoose document before returning
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.error('Error creating user:', error)
    throw error // Re-throw for the Inngest function to catch
  }
}


// --- UPDATE User ---
// Finds a user by their Clerk ID and updates their information.
export async function updateUser(clerkId: string, updateData: UpdateUserParams) {
  try {
    await connect()

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: clerkId }, // Find user by their unique Clerk ID
      updateData,
      { new: true } // Return the updated document
    )

    if (!updatedUser) {
      throw new Error('User not found for update');
    }

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}


// --- DELETE User ---
// Finds a user by their Clerk ID and deletes them from the database.
export async function deleteUser(clerkId: string) {
  try {
    await connect()

    const deletedUser = await User.findOneAndDelete({ clerkId: clerkId });

    if (!deletedUser) {
      // This is not necessarily an error, could be a duplicate webhook.
      // You can decide to throw an error or just log it.
      console.log(`User with Clerk ID ${clerkId} not found for deletion.`);
      return null;
    }

    return JSON.parse(JSON.stringify(deletedUser))
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
