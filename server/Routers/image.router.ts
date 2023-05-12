import {Router, Request, Response} from 'express';
import { generateUploadUrl } from '../services/s3';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';

//TODO: Add image router and maybe change the name
const imageRouter = Router();

imageRouter.get('/upload-url', async (req: Request, res: Response) => {
    try{
        const url = await generateUploadUrl();
        res.status(200).json({status:"success", data:url});
    }catch(error: ErrorWithStatusCode|any){
        res.status(error.statusCode || 500).json({status:"failure", message:error.message});
    }
});


export default imageRouter;