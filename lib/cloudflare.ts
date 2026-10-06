import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://fef11ce54ef1091149bde96e75b9ba42.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'bdc310951e0d1a6a782f9c762fb5df17',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '8e33fd53f5c004876a3fb18405edf05c8ea519f05b9ea697dbb6fea8ed72345e',
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME || 'bestmodelibiza';

/**
 * Resolves an image URL:
 * If a custom R2 public URL is configured and available, it points to R2.
 * Otherwise, it smoothly falls back to the original verified image URL.
 */
export function resolveImageUrl(originalUrl: string): string {
  if (!originalUrl) return '/placeholder-model.jpg';
  
  // If user sets a custom Cloudflare R2 public domain or CDN
  const r2PublicDomain = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN;
  if (r2PublicDomain && originalUrl.includes('bestmodelibiza.com/wp-content/uploads/')) {
    const filename = originalUrl.split('/uploads/')[1];
    return `${r2PublicDomain}/${filename}`;
  }

  return originalUrl;
}
