import type { Config } from '@netlify/functions';
import { createNetlifyTRPCHandler } from '@netlify/sdk/ui/functions/trpc';
import { appRouter } from '../server/router';

export const config: Config = {
  path: ['/api/trpc{/*}?'],
};

const handler = createNetlifyTRPCHandler({
  endpoint: '/api/trpc',
  router: appRouter,
});

export default handler;
