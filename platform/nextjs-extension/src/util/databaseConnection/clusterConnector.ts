import * as mongodb from 'mongodb';

export const teardown = async (client: mongodb.MongoClient): Promise<void> => {
  await client.close();
};

// Handles memoization of db object, and initial connection logic if needs to be initialized
export const dbClient = async ({
  uri,
  appName,
}: { uri: string; appName: string }): Promise<mongodb.MongoClient> => {
  try {
    const client = new mongodb.MongoClient(uri, { appName });
    await client.connect();
    return client;
  } catch (error) {
    throw new Error(`Error at client connection: ${error} `);
  }
};
