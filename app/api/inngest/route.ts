// app/api/inngest/route.ts
// This file handles the complete lifecycle of user synchronization from Clerk to your database.

import { NextResponse, NextRequest } from 'next/server';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { serve } from 'inngest/next';

// --- Import your Inngest client and all required server actions ---
import { inngest } from '@/lib/inngest/client';
import {
  createUser,
  updateUser,
  deleteUser,
} from '@/lib/actions/user.actions';

// --- Environment Variable Check ---
const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
if (!CLERK_WEBHOOK_SIGNING_SECRET) {
  throw new Error('CLERK_WEBHOOK_SIGNING_SECRET is not set in environment variables!');
}


//================================================================================//
//                                                                                //
//                       INNGEST FUNCTIONS (BACKGROUND JOBS)                      //
//                                                                                //
//================================================================================//

/**
 * Handles the 'user.created' event.
 * Extracts user data from the webhook payload and calls the createUser action.
 */
const handleUserCreated = inngest.createFunction(
  { id: 'handle-user-created', name: 'Handle User Created' },
  { event: 'clerk/user.created' },
  async ({ event, step }) => {
    const userData = event.data;

    const newUser = await step.run('create-user-in-db', async () => {
      const { id, email_addresses, image_url, username, first_name, last_name } = userData;

      if (!email_addresses || email_addresses.length === 0) {
        throw new Error(`User created event for Clerk ID ${id} is missing an email address.`);
      }
      const primaryEmail = email_addresses[0].email_address;

      // Call your existing createUser server action
      return await createUser({
        clerkId: id,
        email: primaryEmail,
        username: username || primaryEmail.split('@')[0], // Provide a fallback username
        photo: image_url,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
      });
    });

    return { message: `User ${userData.id} created successfully.`, data: newUser };
  }
);

/**
 * Handles the 'user.updated' event.
 * Extracts user data and calls the updateUser action.
 */
const handleUserUpdated = inngest.createFunction(
  { id: 'handle-user-updated', name: 'Handle User Updated' },
  { event: 'clerk/user.updated' },
  async ({ event, step }) => {
    const userData = event.data;

    const updatedUser = await step.run('update-user-in-db', async () => {
      const { id, email_addresses, image_url, username, first_name, last_name } = userData;

      const primaryEmail = email_addresses[0]?.email_address;
      if (!primaryEmail) {
        throw new Error(`User updated event for Clerk ID ${id} is missing an email address.`);
      }

      // Prepare the update payload
      const userUpdateData = {
        email: primaryEmail,
        username: username || primaryEmail.split('@')[0],
        photo: image_url,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
      };

      // Call your updateUser action
      return await updateUser(id, userUpdateData);
    });

    return { message: `User ${userData.id} updated successfully.`, data: updatedUser };
  }
);

/**
 * Handles the 'user.deleted' event.
 * Extracts the user ID and calls the deleteUser action.
 */
const handleUserDeleted = inngest.createFunction(
  { id: 'handle-user-deleted', name: 'Handle User Deleted' },
  { event: 'clerk/user.deleted' },
  async ({ event, step }) => {
    // For deletions, the payload might be smaller. We only need the ID.
    // The 'deleted' flag is a failsafe.
    const { id, deleted } = event.data;

    if (!id || !deleted) {
      // If the event is malformed or not a deletion, skip.
      throw new Error('Invalid user.deleted event payload.');
    }

    const deletedUser = await step.run('delete-user-in-db', async () => {
      // Call your deleteUser action
      return await deleteUser(id);
    });

    return { message: `User ${id} deleted successfully.`, data: deletedUser };
  }
);


//================================================================================//
//                                                                                //
//                         API ROUTE HANDLERS (INGESTION)                         //
//                                                                                //
//================================================================================//

/**
 * The GET handler registers all your Inngest functions.
 */
export const GET = serve({
  client: inngest,
  functions: [
    handleUserCreated,
    handleUserUpdated,
    handleUserDeleted,
  ],
});

/**
 * The POST handler receives, verifies, and forwards webhooks to Inngest.
 */
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: CLERK_WEBHOOK_SIGNING_SECRET,
    }) as WebhookEvent;

    // Send the verified event to Inngest for background processing
    await inngest.send({
      name: `clerk/${evt.type}`, // e.g., "clerk/user.created"
      data: evt.data,
      user: { clerkId: evt.data.id },
    });

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });

  } catch (err: unknown) { // <-- FIX: Changed 'any' to 'unknown'
    console.error('Error in webhook handler:', err);
    
    // FIX: Type-safe error message handling
    let errorMessage = 'An unknown error occurred while verifying the webhook.';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
