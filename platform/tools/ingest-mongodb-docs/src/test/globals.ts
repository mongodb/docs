import { MongoMemoryServer, MongoMemoryReplSet } from "mongodb-memory-server";

declare global {
  // eslint-disable-next-line no-var
  var __MONGO_MEMORY_SERVER_INSTANCE: MongoMemoryServer;
  // eslint-disable-next-line no-var
  var __MONGO_MEMORY_REPLICA_SET: MongoMemoryReplSet;
}

export {};
