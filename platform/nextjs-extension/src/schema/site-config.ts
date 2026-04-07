import * as z from 'zod';

export const SiteConfigSchema = z.object({
  exampleString: z.string().min(1),
  exampleSecret: z.string().min(1),
  exampleBoolean: z.boolean(),
  exampleNumber: z.number(),
});

export type SiteConfig = z.output<typeof SiteConfigSchema>;
