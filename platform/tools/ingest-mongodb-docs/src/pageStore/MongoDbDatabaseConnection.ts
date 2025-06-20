import { DatabaseConnection } from "./DatabaseConnection";
import { MongoClient, Db } from "mongodb";

export interface MakeMongoDbDatabaseConnectionParams {
  connectionUri: string;
  databaseName: string;
}

/**
  Constructs connection to MongoDB database.
 */
export function makeMongoDbDatabaseConnection({
  connectionUri,
  databaseName,
}: MakeMongoDbDatabaseConnectionParams): DatabaseConnection & {
  mongoClient: MongoClient;
  db: Db;
} {
  const mongoClient = new MongoClient(connectionUri, {
    serverSelectionTimeoutMS: 30000,
  });
  const db = mongoClient.db(databaseName);
  return {
    mongoClient,
    db,
    async drop() {
      await db.dropDatabase();
    },

    async close(force) {
      mongoClient.close(force);
    },
  };
}
