import type { Metadata } from "next";
import { AtsCheckerClient } from "./client";

// Note: actual Metadata export lives in ./metadata.ts to keep this file as RSC.
// Re-export so Next.js metadata API picks it up:
export { metadata } from "./metadata";

export const dynamic = "force-static";

export default function AtsCheckerPage() {
  return <AtsCheckerClient />;
}
