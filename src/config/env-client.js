import { z } from "zod/v4";

const envClientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().optional().default("http://localhost:3000"),
});

export const clientEnv = envClientSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
