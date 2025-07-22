// lib/inngest/client.ts
// This file defines and exports the Inngest client for use across your application.

import { Inngest } from 'inngest';

// Create a new Inngest client with a unique ID for your app
export const inngest = new Inngest({ id: 'loomika' });
