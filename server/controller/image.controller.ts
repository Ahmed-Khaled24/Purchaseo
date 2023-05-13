import { generateUploadUrl } from "../services/s3";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { Request, Response } from "express";
import crypto from "crypto";
import { promisify } from "util";
import { dbUpdateUserById } from "../model/users.model";
import { dbAddProductImage } from "../model/product.image.model";
import {v4 as uuidv4} from "uuid";
import { regulateRequests } from "../services/redis";

const randomBytes = promisify(crypto.randomBytes);

export async function getUploadUrl(req: Request, res: Response) {
    try {
        console.log("getUploadUrl");
        // TODO: add in redis to reduce api calls
        // black list for an hour if more than 50 requests per second
        try {
            await regulateRequests(req.user?.user_id as number)
        } catch (error: ErrorWithStatusCode | any) {
            return res.status(error.statusCode || 500).json({ status: "failure", message: error.message });
        }
        // check File size before sending back url
        const {directoryType, productId, fileSize} = req.query ;
        if(Number(fileSize) > 5000000 || fileSize === undefined){
            return res.status(400).json({ status: "failure", message: "File size too large (Max 5 MB) or unspecified" });
        }
        // const productId = uuidv4();
        // const directoryType = "Product"
        const imageName = uuidv4();
        let directory: string ;
        if(directoryType === "Profile"){
            directory = `Users/${req.user?.user_id}`;
        }else{
            directory = `Products/${productId}`;
        }
        const imageUrl = `${directory}/${imageName}`;
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