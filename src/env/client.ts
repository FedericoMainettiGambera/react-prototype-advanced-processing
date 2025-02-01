import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_ADVANCED_PROCESSING_BASE_API_URL: z.string().url(),
    VITE_BASE_TABLE_API_URL: z.string().url(),
  },
  runtimeEnv: import.meta.env,
});
