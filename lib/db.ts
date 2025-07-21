import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL!

// Define a type for the cached connection
interface MongooseConn {
  conn: Mongoose | null
  // Make promise explicitly allow null, as it's null initially and on error
  promise: Promise<Mongoose> | null
}

// Declare `global` to have a `mongoose` property of type `MongooseConn`
// This is the correct way to extend the global object without 'any'
declare global {
  var mongoose: MongooseConn // Use 'var' for global declarations
}

// Global cached object for Mongoose connection
// Assign directly to global.mongoose, as it's now properly declared
let cached = global.mongoose

if (!cached) {
  // Initialize global.mongoose if it doesn't exist
  global.mongoose = {
    conn: null,
    promise: null,
  }
  cached = global.mongoose // Assign the newly initialized global.mongoose to cached
}

export const connect = async () => {
  // Ensure MONGODB_URL is defined
  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in environment variables.')
  }

  // If a connection already exists, return it
  if (cached.conn) {
    console.log('Using existing MongoDB connection')
    return cached.conn
  }

  // If a connection promise is already in progress, wait for it
  if (!cached.promise) {
    console.log('Creating new MongoDB connection promise')
    // Assign the promise directly.
    // Use .then() and .catch() to handle success/failure and reset promise on error.
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: 'clerk-next15-db',
        bufferCommands: false, // Recommended for serverless environments
        // connectTimeoutMS: 30000, // Still optional, generally not needed
      })
      .then((m) => {
        console.log('MongoDB connected successfully')
        return m // Return the Mongoose instance
      })
      .catch((error) => {
        cached.promise = null // Reset promise if connection fails to allow retry
        console.error('MongoDB connection error:', error)
        throw error // Re-throw the error to be handled by the caller
      })
  }

  // Await the promise to get the Mongoose instance
  // This will await the existing promise or the newly created one
  cached.conn = await cached.promise

  return cached.conn
}
