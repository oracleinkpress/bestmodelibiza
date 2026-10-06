import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || 'fef11ce54ef1091149bde96e75b9ba42';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'bdc310951e0d1a6a782f9c762fb5df17';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '8e33fd53f5c004876a3fb18405edf05c8ea519f05b9ea697dbb6fea8ed72345e';
const bucketName = process.env.R2_BUCKET_NAME || 'bestmodelibiza';

const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

const s3 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

console.log('--- Cloudflare R2 Upload & Sync Tool ---');
console.log(`Endpoint: ${endpoint}`);
console.log(`Bucket: ${bucketName}`);

async function checkOrInitBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket '${bucketName}' exists.`);
  } catch (err) {
    console.log(`Bucket check note: ${err.message}`);
    try {
      console.log(`Attempting to create bucket '${bucketName}'...`);
      await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket '${bucketName}' created successfully.`);
    } catch (createErr) {
      console.error(`Cannot create bucket automatically: ${createErr.message}`);
      console.log('NOTE: Please ensure R2 is activated in your Cloudflare dashboard (Storage & databases -> R2).');
    }
  }
}

async function uploadFile(localPath, s3Key) {
  const fileContent = fs.readFileSync(localPath);
  let contentType = 'image/jpeg';
  if (localPath.endsWith('.png')) contentType = 'image/png';
  else if (localPath.endsWith('.webp')) contentType = 'image/webp';
  else if (localPath.endsWith('.mp4')) contentType = 'video/mp4';

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
    })
  );
}

async function run() {
  await checkOrInitBucket();
  
  const uploadsDir = path.resolve(process.cwd(), 'public_html/wp-content/uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.error(`Uploads directory not found at ${uploadsDir}`);
    return;
  }

  console.log(`Scanning directory: ${uploadsDir}`);
  // Traverse and upload
  let count = 0;
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(jpg|jpeg|png|webp|heic|mp4)$/i.test(entry.name)) {
        const relativeKey = path.relative(uploadsDir, fullPath).replace(/\\/g, '/');
        // upload logic can be invoked here
        count++;
      }
    }
  }
  walk(uploadsDir);
  console.log(`Found ${count} model media assets ready for Cloudflare R2 sync!`);
}

run().catch(console.error);
