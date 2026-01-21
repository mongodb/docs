import 'dotenv/config';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { randomBytes } from 'crypto';

export async function dropExistingDatabase(client, databaseName) {
  const database = client.db(databaseName);
  await database.dropDatabase();
}

// Paste helper methods below