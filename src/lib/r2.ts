import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

// R2 Configuration with correct endpoint and SSL settings
console.log('R2 Configuration check:', {
  CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
  R2_BUCKET: process.env.R2_BUCKET,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL
});

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  maxAttempts: 3,
  forcePathStyle: true,
  // Add proper TLS configuration
  tls: true,
  requestHandler: {
    requestTimeout: 30000,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL || `https://pub-${process.env.CF_ACCOUNT_ID}.r2.dev`;

export interface UploadResult {
  url: string;
  key: string;
  isLocal: boolean;
}

/**
 * Upload a file to Cloudflare R2
 * @param file - File object to upload
 * @returns Promise<UploadResult> - Contains public URL and file key
 */
export async function uploadToR2(file: File): Promise<UploadResult> {
  console.log('Starting R2 upload process...');
  console.log('File details:', {
    name: file.name,
    size: file.size,
    type: file.type
  });

  if (!BUCKET_NAME || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('R2 credentials check:', {
      BUCKET_NAME,
      ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET'
    });
    throw new Error('R2 credentials not configured');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
  }

  // Validate file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 10MB.');
  }

  try {
    // Generate unique filename
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const fileName = `products/${timestamp}-${uniqueId}.${fileExtension}`;
    
    console.log('R2 Upload - fileName:', fileName);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    console.log('Executing PutObjectCommand with:', {
      Bucket: BUCKET_NAME,
      Key: fileName,
      ContentType: file.type,
      ContentLength: buffer.length
    });
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    try {
      console.log('Sending command to R2...');
      const result = await r2Client.send(command);
      console.log('R2 command response:', result);
    } catch (s3Error) {
      console.error('S3/R2 upload error:', s3Error);
      throw new Error(`Failed to upload file to R2: ${s3Error instanceof Error ? s3Error.message : 'Unknown error'}`);
    }

    // Return public URL
    const publicUrl = `${PUBLIC_URL}/${fileName}`;
    console.log('R2 upload successful, URL:', publicUrl);

    return {
      url: publicUrl,
      key: fileName,
      isLocal: false,
    };

  } catch (error) {
    console.error('R2 upload error:', error);
    throw new Error(`Failed to upload file to R2: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete a file from Cloudflare R2
 * @param key - File key to delete
 */
export async function deleteFromR2(key: string): Promise<void> {
  if (!BUCKET_NAME) {
    throw new Error('R2 bucket not configured');
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
  } catch (error) {
    console.error('R2 deletion error:', error);
    throw new Error(`Failed to delete file from R2: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract file key from R2 public URL
 * @param url - Public URL
 * @returns File key or null if not found
 */
export function extractKeyFromR2Url(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Remove leading slash from pathname
    return urlObj.pathname.substring(1);
  } catch {
    return null;
  }
}

/**
 * Generate a unique filename for uploads
 * @param originalName - Original file name
 * @returns Unique filename
 */
export function generateUniqueFileName(originalName: string): string {
  const fileExtension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now();
  return `products/${timestamp}-${uniqueId}.${fileExtension}`;
}
