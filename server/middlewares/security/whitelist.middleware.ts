import { Request, Response, NextFunction } from 'express';

// add deployment url to whitelist
const whiteList = [
    `https://localhost${process.env.PORT}`,
]

export function mwCheckInWhiteList(req: Request, res: Response, next: NextFunction){
    console.log("mwCheckInWhiteList");
    const { referer } = req.headers;
    if(whiteList.includes(referer as string)){
        return next();
    }
    res.status(403).send({status: "failure", data: "Access Denied"});
}