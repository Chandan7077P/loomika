// app/api/webhooks/clerk/route.ts
// This file handles incoming Clerk webhook events.

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { WebhookEvent } from '@clerk/nextjs/server' // Correct import for WebhookEvent
import { Webhook } from 'svix'

// Import your createUser function
import { createUser } from '@/lib/actions/user.actions' // Assuming this path

// You will fill this in with your actual Clerk Webhook Secret from the Clerk Dashboard.
// It's highly recommended to store this in your environment variables (e.g., .env.local)
// and access it via process.env.CLERK_WEBHOOK_SECRET
const CLERK_WEBHOOK_SECRET =
  process.env.CLERK_WEBHOOK_SECRET || 'whsec_ybIZCGQ7YKGm6CsVcnxWG/5yjLXecs3f'

export async function POST(req: Request) {
  console.log('Received webhook request')

  // Get the headers. Await the headers() function as it returns a Promise.
  const headerPayload = await headers() // FIX: Added await here
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers')
    return new NextResponse('Error occured -- no svix headers', { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret
  const wh = new Webhook(CLERK_WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
    console.log('Webhook verified successfully')
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new NextResponse('Error occured', { status: 400 })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  console.log(`Processing event type: ${eventType} for user ID: ${id}`)

  // Handle the webhook event
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data

    // Ensure we have an email address
    if (!email_addresses || email_addresses.length === 0) {
      console.error('User created event missing email address:', id)
      return new NextResponse('User created event missing email address', {
        status: 400,
      })
    }

    const primaryEmail = email_addresses[0].email_address

    try {
      const newUser = await createUser({
        clerkId: id,
        email: primaryEmail,
        username: username || primaryEmail.split('@')[0], // Use username if available, otherwise derive from email
        photo: image_url,
        // FIX: Coerce null to undefined for firstName and lastName to match CreateUserParams
        // Alternatively, update CreateUserParams in user.actions.ts to allow `string | null | undefined`
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        // planId and creditBalance will use default values from schema if not provided
      })
      console.log('User created in DB:', newUser)
    } catch (dbError) {
      console.error('Error saving new user to database:', dbError)
      return new NextResponse('Error saving user to database', { status: 500 })
    }
  }

  // You can add handlers for other event types if needed, e.g.:
  // if (eventType === 'user.updated') {
  //   // Logic to update user in your database
  //   console.log('User updated event:', evt.data);
  // }
  // if (eventType === 'user.deleted') {
  //   // Logic to delete user from your database
  //   console.log('User deleted event:', evt.data);
  // }

  return new NextResponse('Webhook received and processed', { status: 200 })
}
