import { generateUploadUrl } from "../services/s3";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { Request, Response } from "express";
import crypto from "crypto";
import { promisify } from "util";
import { dbUpdateUserById } from "../model/users.model";
import { dbAddProductImage } from "../model/product.image.model";
import { v4 as uuidv4 } from "uuid";
import { regulateRequests } from "../services/redis";
import { dbAddImagesToAProduct } from "../model/products.model";

const randomBytes = promisify(crypto.randomBytes);

export async function getUploadUrls(req: Request, res: Response) {
    try {
        console.log("getUploadUrl");
        // black list for an hour if more than 50 requests per second
        try {
            await regulateRequests(req.user?.user_id as number);
        } catch (error: ErrorWithStatusCode | any) {
            return res
                .status(error.statusCode || 500)
                .json({ status: "failure", message: error.message });
        }
        // take these as queries
        const { directoryType, productId, fileSize, length } = req.query;
        // Check images length
        if(Number(length) > 10){
            return res.status(400).json({
                status: "failure",
                message: "Too many files (Max 10)",
            })
        }
        //Check file size
        if (Number(fileSize) > 5000000 || fileSize === undefined) {
            return res
                .status(400)
                .json({
                    status: "failure",
                    message: "File size too large (Max 5 MB) or unspecified",
                });
        }
        // Decide directory name
        let directory: string;
        if (directoryType === "Profile") {
            directory = `Users/${req.user?.user_id}`;
        } else {
            directory = `Products/${productId}`;
        }

        // Generate pre signed urls
        let preSignedUrls: string[] = [];
        for (let i = 0; i < Number(length); i++) {
            const imageName = uuidv4();
            const imageUrl = `${directory}/${imageName}`;
            const url = await generateUploadUrl(imageUrl);
            preSignedUrls.push(url);
        }
        res.status(200).json({ status: "success", data: preSignedUrls });
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
        const { imageUrls, productId } = req.body;
        console.log({ imageUrls });
        const imageUrlsShortened = imageUrls.map((url: string) => {
            return url.split("?")[0];
        });
        await dbAddImagesToAProduct(productId, imageUrlsShortened);
        return res.status(201).json({ status: "success", data: "images added" });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            message: error.message,
        });
    }
}
