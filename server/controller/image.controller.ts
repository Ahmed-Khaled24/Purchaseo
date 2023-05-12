import { generateUploadUrl } from "../services/s3";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { Request, Response } from "express";

export async function getUploadUrl(req: Request, res: Response) {
    try {
        const url = await generateUploadUrl();
        res.status(200).json({ status: "success", data: url });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            message: error.message,
        });
    }
}
