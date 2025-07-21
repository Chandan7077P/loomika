// app/api/webhooks/clerk/route.ts
// This file handles incoming Clerk webhook events using Clerk's built-in verifyWebhook.

import { NextResponse, NextRequest } from 'next/server';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';

// Import your createUser function
import { createUser } from '@/lib/actions/user.actions'; // Assuming this path

// Use a more specific name for the secret as per Clerk's documentation
const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

// It's crucial to throw an error if the secret is not set,
// as the webhook verification will fail without it.
if (!CLERK_WEBHOOK_SIGNING_SECRET) {
  throw new Error('CLERK_WEBHOOK_SIGNING_SECRET is not set in environment variables!');
}

export async function POST(req: NextRequest) {
  console.log('Received webhook request.');

  let evt: WebhookEvent;
  try {
    // The verifyWebhook function now correctly expects 'signingSecret'
    // within its options object for your Clerk SDK version.
    evt = await verifyWebhook(req, {
      signingSecret: CLERK_WEBHOOK_SIGNING_SECRET,
    }) as WebhookEvent;
    console.log('Webhook verified successfully');
  } catch (err) {
    console.error('Error verifying webhook:', err);
    // Use NextResponse.json for API responses
    return NextResponse.json({ error: 'Error verifying webhook' }, { status: 400 });
  }

  // Get the ID and type from the verified event
  const { id } = evt.data;
  const eventType = evt.type;

  // Add a robust check for the user ID
  if (!id || typeof id !== 'string') {
    console.error('Webhook event missing valid user ID.');
    return NextResponse.json(
      { error: 'Webhook event missing user ID' },
      { status: 400 }
    );
  }

  console.log(`Processing event type: ${eventType} for user ID: ${id}`);
  // Only log the full payload in non-production environments for security and verbosity
  if (process.env.NODE_ENV !== 'production') {
    console.log('Webhook payload:', evt.data);
  }

  // Handle the webhook event based on its type
  if (eventType === 'user.created') {
    const { email_addresses, image_url, username, first_name, last_name } = evt.data;

    // Ensure we have an email address, which is crucial for user creation
    if (!email_addresses || email_addresses.length === 0) {
      console.error('User created event missing email address for ID:', id);
      return NextResponse.json(
        { error: 'User created event missing email address' },
        { status: 400 }
      );
    }

    const primaryEmail = email_addresses[0].email_address;

    try {
      // Call your createUser function to save the user to your database
      const newUser = await createUser({
        clerkId: id, // Now definitely type 'string' due to the check above
        email: primaryEmail,
        username: username || primaryEmail.split('@')[0], // Fallback username
        photo: image_url,
        // Coerce null to undefined to match CreateUserParams interface if it expects undefined
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        // planId and creditBalance will use default values from schema if not provided
      });
      console.log('User created in DB:', newUser);
    } catch (dbError) {
      console.error('Error saving new user to database:', dbError);
      // Return a 500 status for internal server errors during DB operation
      return NextResponse.json(
        { error: 'Error saving user to database' },
        { status: 500 }
      );
    }
  }
  // Add handlers for other event types as needed, e.g., 'user.updated', 'user.deleted'
  // if (eventType === 'user.updated') {
  //   const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;
  //   console.log(`User ${id} updated.`);
  //   // Implement logic to update the user in your database
  // } else if (eventType === 'user.deleted') {
  //   const { id } = evt.data;
  //   console.log(`User ${id} deleted.`);
  //   // Implement logic to delete or soft-delete the user in your database
  // }

  // Respond with a 200 OK status once the webhook has been successfully processed
  return NextResponse.json({ status: 'Webhook received and processed' }, { status: 200 });
}
