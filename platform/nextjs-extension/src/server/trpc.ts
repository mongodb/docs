import { initTRPC } from '@trpc/server';
import type { Context } from '@netlify/sdk/ui/functions/trpc';

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const procedure = trpc.procedure;
