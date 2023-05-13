import { generateUploadUrl } from "../services/s3";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { Request, Response } from "express";
import crypto from "crypto";
import { promisify } from "util";
import { dbUpdateUserById } from "../model/users.model";
import { dbAddProductImage } from "../model/product.image.model";

const randomBytes = promisify(crypto.randomBytes);

export async function getUploadUrl(req: Request, res: Response) {
    try {
        console.log("getUploadUrl");
        // TODO: UUID
        // TODO: add in redis to reduce api calls
        const imageName = (await randomBytes(16)).toString("hex");
        const directoryName = req.user?.user_id as number;
        const imageUrl = `Users/User_${directoryName}/${imageName}`;
        const url = await generateUploadUrl(imageUrl);
        res.status(200).json({ status: "success", data: url });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            message: error.message,
        });
    }
}

export async function addUserImage(req: Request, res: Response) {
    try {
        const { imageUrl } = req.body;
        console.log({ imageUrl });
        const userId = req.user?.user_id as number;
        await dbUpdateUserById(userId, { image_url: imageUrl });
        return res.status(200).json({ status: "success", data: "image added" });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            message: error.message,
        });
    }
}

export async function addProductImage(req: Request, res: Response) {
    try {
        const { imageUrl, productId } = req.body;
        console.log({ imageUrl });
        await dbAddProductImage({ product_id: productId, file_path: imageUrl, name: imageUrl.split("?")[0] });
        return res.status(200).json({ status: "success", data: "image added" });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            message: error.message,
        });
    }
}