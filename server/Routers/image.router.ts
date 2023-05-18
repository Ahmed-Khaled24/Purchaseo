import { Router, Request, Response } from "express";
import {
    addProductImage,
    addUserImage,
    getProductImages,
    getUploadUrls,
} from "../controller/image.controller";
import { dbUpdateUserById } from "../model/users.model";

//TODO: Add image router and maybe change the name
// TODO: fix the access hierarchy (if on same level check string )
// TODO: delete image from s3 if deleted from db (maybe add a trigger)
const imageRouter = Router();

imageRouter
.get("/upload-url", getUploadUrls)
.patch("/user/add", addUserImage)
.post("/product/add", addProductImage);

export default imageRouter;
