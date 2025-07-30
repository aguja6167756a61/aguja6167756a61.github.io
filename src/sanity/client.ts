import { createClient } from "@sanity/client";

export default createClient({
  projectId: "8mibvour",
  dataset: "production",
  apiVersion: "2025-07-29",
  // Set to `true` for production environments
  useCdn: false,
});
