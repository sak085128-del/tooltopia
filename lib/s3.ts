import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.S3_ENDPOINT?.trim();
const accessKeyId =
  process.env.S3_ACCESS_KEY_ID?.trim() ?? process.env.AWS_ACCESS_KEY_ID?.trim();
const secretAccessKey =
  process.env.S3_SECRET_ACCESS_KEY?.trim() ?? process.env.AWS_SECRET_ACCESS_KEY?.trim();
const region = process.env.S3_REGION?.trim() || "us-east-1";
export const S3_BUCKET = process.env.S3_BUCKET?.trim() || "assets";
const publicBase = process.env.S3_PUBLIC_URL?.trim();

export function isS3Configured(): boolean {
  return Boolean(endpoint && accessKeyId && secretAccessKey);
}

let client: S3Client | null = null;
function getClient(): S3Client {
  if (!isS3Configured()) {
    throw new Error("S3 storage is not configured (S3_ENDPOINT / S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY missing).");
  }
  if (!client) {
    client = new S3Client({
      endpoint,
      region,
      forcePathStyle: true,
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
    });
  }
  return client;
}

/** Upload a buffer to the bucket and return the public (or presigned) URL. */
export async function uploadToS3(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  return objectUrl(key);
}

/** Build a URL for an object: use the public base when available, else presign. */
export async function objectUrl(key: string): Promise<string> {
  if (publicBase) {
    return `${publicBase.replace(/\/+$/, "")}/${key}`;
  }
  return getSignedUrl(getClient(), new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }), {
    expiresIn: 60 * 60 * 24,
  });
}