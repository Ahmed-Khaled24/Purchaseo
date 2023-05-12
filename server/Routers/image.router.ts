import { Router, Request, Response } from "express";
import { getUploadUrl } from "../controller/image.controller";

//TODO: Add image router and maybe change the name
const imageRouter = Router();

imageRouter.get("/upload-url", getUploadUrl);

export default imageRouter;
