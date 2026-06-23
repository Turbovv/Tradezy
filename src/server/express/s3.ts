import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const AWS_BUCKET = process.env.AWS_BUCKET || "";
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL;

export const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

const sanitizeFileName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");

const publicBaseUrl = S3_PUBLIC_URL
  ? S3_PUBLIC_URL.replace(/\/$/, "")
  : `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;

export async function createUploadUrl(fileName: string, contentType: string) {
  const safeName = sanitizeFileName(fileName);
  const key = `products/${Date.now()}-${randomUUID()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return {
    uploadUrl,
    fileUrl: `${publicBaseUrl}/${key}`,
    key,
  };
}
