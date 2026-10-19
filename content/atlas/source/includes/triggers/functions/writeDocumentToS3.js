/*
 * Write a newly-inserted document to an S3 bucket as an Extended JSON object.
 */
exports = async function writeDocumentToS3(changeEvent) {
  const { fullDocument } = changeEvent;

  // require calls must be in the exports function
  const S3 = require("aws-sdk/clients/s3");
  const s3 = new S3({
    accessKeyId: context.values.get("AwsAccessKeyId"),
    secretAccessKey: context.values.get("AwsSecretAccessKey"),
    region: "YOUR_AWS_REGION",
  });

  const key = `inserted-documents/${fullDocument._id.toString()}.json`;

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  await s3.putObject({
    Bucket: "YOUR_S3_BUCKET_NAME",
    Key: key,
    Body: EJSON.stringify(fullDocument),
    ContentType: "application/json",
  }).promise();

  return `Wrote document ${fullDocument._id} to ${key}`;
};
