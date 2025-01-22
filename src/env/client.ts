import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_SYNCFUSION_LICENSE_KEY: z.string(),
  },
  runtimeEnv: import.meta.env,
});
