import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3, S3ClientConfig } from "@aws-sdk/client-s3";
import keys from "../config/keys";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";


// TODO: Change the CORS in the S# BUcket for production

const region = keys.S3_REGION;
const bucketName = keys.S3_BUCKET_NAME;
const accessKeyId = keys.S3_ACCESS_KEY_ID;
const secretAccessKey = keys.S3_SECRET_ACCESS_KEY;

const s3Config: S3ClientConfig = {};
const s3 = new S3({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export async function generateUploadUrl(imageName: string) {
    // image name should be unique may be passed from client side
    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: imageName,
        });

        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
        console.log({ uploadUrl });
        return uploadUrl;
    } catch (error: ErrorWithStatusCode | any) {
        throw new ErrorWithStatusCode(error.message, 500);
    }
}

export async function deleteImageFromS3Bucket(key: string) {
    // Todo update the iam user policy to delete object
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    try {
      const data = await s3.send(new DeleteObjectCommand(params));
      console.log(`Successfully deleted ${key} from ${bucketName}`);
    } catch (err) {
      console.log("Error", err);
    }
  }