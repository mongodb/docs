/**
 * Thin S3 upload wrapper, following the same client setup and credential
 * env vars as platform/nextjs-extension/src/s3Connection/s3connector.ts (the
 * connector offline-docs and searchManifests already use), so this script
 * doesn't need a workspace dependency on nextjs-extension.
 */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) {
    return client;
  }
  const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing AWS credentials: set AWS_S3_ACCESS_KEY_ID and AWS_S3_SECRET_ACCESS_KEY (the same env vars ' +
        'platform/nextjs-extension/src/s3Connection/s3connector.ts uses).',
    );
  }
  // AWS_SESSION_TOKEN is only needed for temporary/SSO-issued credentials
  // (permanent IAM user access keys don't have one); s3connector.ts doesn't
  // support it since it's only ever run with permanent keys in CI.
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  client = new S3Client({
    credentials: { accessKeyId, secretAccessKey, sessionToken },
    region: 'us-east-2',
    // docs-mongodb-org-dotcomstg's actual region isn't documented anywhere
    // in this repo (s3connector.ts's hardcoded 'us-east-2' is a guess, not a
    // confirmed value); this makes a wrong guess self-correct via S3's
    // region-redirect response instead of failing with "must be addressed
    // using the specified endpoint".
    followRegionRedirects: true,
  });
  return client;
}

export async function putTextFile(params: { bucket: string; key: string; body: string }): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
      Body: params.body,
      ContentType: 'text/plain; charset=utf-8',
    }),
  );
}
