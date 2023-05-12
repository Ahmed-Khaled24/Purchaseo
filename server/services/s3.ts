import {GetObjectCommand, S3, S3ClientConfig} from '@aws-sdk/client-s3';
import keys from '../config/keys';
import crypto from 'crypto';
import { promisify } from 'util';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

const randomBytes = promisify(crypto.randomBytes);

// TODO: Change the CORS in the S# BUcket for production

const region = keys.S3_REGION;
const bucketName = keys.S3_BUCKET_NAME;
const accessKeyId = keys.S3_ACCESS_KEY_ID;
const secretAccessKey = keys.S3_SECRET_ACCESS_KEY;

const s3Config : S3ClientConfig = {}
const s3 = new S3({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    },

    
});


export async function generateUploadUrl() {
    // image name should be unique may be passed from client side
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageName,
    });


    const uploadUrl = await getSignedUrl( s3 ,command , { expiresIn: 60 });
    console.log({uploadUrl});
    return uploadUrl;
}
