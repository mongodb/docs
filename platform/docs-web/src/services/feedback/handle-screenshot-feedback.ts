import type { Viewport } from '@/types/data';
import type { Attachment } from '@/services/feedback/feedback-types';
import type { FeedbackDocument } from '@/services/db/feedback';

import S3 from 'aws-sdk/clients/s3';
import envConfig from '@/utils/env-config';

export interface ScreenshotAttachment extends Attachment {
  type: 'screenshot';
  dataUri: string;
  viewport: Viewport;
}

export interface S3ScreenshotAttachment extends ScreenshotAttachment, S3ScreenshotInfo {}

export async function getAttachment({
  feedback,
  attachment,
}: {
  feedback: FeedbackDocument;
  attachment: Attachment;
}): Promise<Attachment | S3ScreenshotAttachment> {
  const s3 = new S3({
    accessKeyId: envConfig.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: envConfig.AWS_S3_SECRET_ACCESS_KEY,
    region: envConfig.AWS_KEY_REGION,
  });

  switch (attachment.type) {
    case 'ipData':
      break;
    case 'screenshot': {
      const s3data = await saveScreenshot(feedback, attachment as ScreenshotAttachment, s3);
      attachment = { ...attachment, ...s3data } as S3ScreenshotAttachment;
      console.log('created screenshot attachment', JSON.stringify(attachment));
      break;
    }
    default:
      break;
  }
  return attachment;
}

export interface S3ScreenshotInfo {
  ETag: string;
  fileType: 'image/png';
  bucket: 'docs-feedback-screenshots';
  fileName: string;
  url: string;
}

// Save and upload screenshot to S3 docs-feedback-screenshots bucket
async function saveScreenshot(
  feedback: FeedbackDocument,
  attachment: ScreenshotAttachment,
  s3: S3,
): Promise<S3ScreenshotInfo> {
  const { dataUri } = attachment;
  const fileType = 'image/png';
  const bucket = 'docs-feedback-screenshots';
  const region = envConfig.AWS_KEY_REGION;
  const fileName = `screenshot-${feedback._id}.png`;
  const ETag = await uploadScreenshot({ dataUri, bucket, fileName, s3 });

  const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
  return { ETag, fileType, bucket, fileName, url };
}

async function uploadScreenshot({
  dataUri,
  bucket,
  fileName,
  fileType = 'image/png',
  s3,
}: {
  dataUri: string;
  bucket: string;
  fileName: string;
  fileType?: string;
  s3: S3;
}): Promise<string> {
  const s3Response = await s3
    .putObject({
      Bucket: bucket,
      Key: fileName,
      ContentType: fileType,
      Body: Buffer.from(splitter(dataUri), 'base64'),
    })
    .promise();

  const { ETag } = s3Response;

  if (!s3Response || !ETag) {
    console.error('Failed to upload screenshot to S3 bucket');
    throw new Error('Failed to upload screenshot to S3 bucket');
  }
  console.log('Uploaded screenshot to S3 bucket');

  return ETag;
}

function splitter(dataUri: string): string {
  return dataUri.split(',').splice(1).join('');
}
