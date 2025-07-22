// Execute a find command
await collection
  .find({ $where: "sleep(100) || true" })
  .maxTimeMS(50);
