import type { MongoClient, Db } from 'mongodb';

// cached db object, so we can handle initial connection process once if unitialized
let dbInstance: Db;
// Handles memoization of db object, and initial connection logic if needs to be initialized
export const db = async (client: MongoClient) => {
  if (!dbInstance) {
    try {
      dbInstance = client.db(process.env.POOL_DB_NAME);
    } catch (error) {
      console.error(`Error at db client connection: ${error}`);
      throw error;
    }
  }
  return dbInstance;
};
