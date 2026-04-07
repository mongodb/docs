import * as z from 'zod';

export const TeamConfigSchema = z.object({
  exampleString: z.string().min(1),
  exampleSecret: z.string().min(1),
  exampleBoolean: z.boolean(),
  exampleNumber: z.number(),
});

export type TeamConfig = z.output<typeof TeamConfigSchema>;
