import type { MongoMemoryServer, MongoMemoryReplSet } from "mongodb-memory-server";

declare global {
  var __MONGO_MEMORY_SERVER_INSTANCE: MongoMemoryServer;
  var __MONGO_MEMORY_REPLICA_SET: MongoMemoryReplSet;
}

export {};
