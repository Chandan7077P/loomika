import { Schema, model, models } from 'mongoose' // Corrected import

const UserSchema = new Schema({
  clerkId: {
    type: String, // Correct syntax: comma after each property
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: String,
    default: 1, // Example: default plan for new users
  },
  creditBalance: {
    type: Number,
    default: 10, // Example: starting credit balance
  },
})

// To prevent Mongoose from recompiling models in development (hot-reloading)
// and reuse existing models if they already exist
const User = models?.User || model('User', UserSchema)

export default User
