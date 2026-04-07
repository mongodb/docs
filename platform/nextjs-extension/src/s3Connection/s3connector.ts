import { S3Client as Client } from '@aws-sdk/client-s3';
import { PutObjectCommand, type S3Client } from '@aws-sdk/client-s3';
import type { ReadStream } from 'node:fs';

// TODO: set this in dbEnvVars or configEnv
let client: S3Client | null;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;

const connectToS3 = (
  // AWS_S3_ACCESS_KEY_ID: string,
  // AWS_S3_SECRET_ACCESS_KEY: string,
): S3Client => {
  if (client) return client;
  if (!AWS_SECRET_ACCESS_KEY || !AWS_ACCESS_KEY_ID) {
    throw new Error('credentials not found');
  }
  const newClient = new Client({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    region: 'us-east-2',
  });
  client = newClient;
  return client;
};

export const upload = async (params: {
  Bucket: string;
  Key: string;
  Body: string | ReadStream;
}) => {
  try {
    if (!client) {
      client = connectToS3();
    }
    const command = new PutObjectCommand(params);
    const response = await client.send(command);
    return response;
  } catch (e) {
    throw new Error(`Error uploading manifests to s3 ${e}`);
  }
};

export const destroyClient = () => {
  if (client) {
    client.destroy();
    client = null;
  }
};
