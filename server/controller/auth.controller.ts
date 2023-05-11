import { Request, Response } from "express";
import { User } from "../types/User";
import https from "https";
import { encryptPassword } from "../util/bcrypt";
import {
    dbAddUserEncrypted,
    dbGetUserByEmail,
    dbUpdateUser,
    dbUpdateUserByEmail,
    dbUpdateUserById,
} from "../model/users.model";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import keys from "../config/keys";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/nodemailer";
import { redisClient } from "../services/redis";
import fetch from "node-fetch";
import axios from "axios";
export async function signUpUser(req: Request, res: Response) {
    const { Fname, Lname, email, password, role } = req.body;

    try {
        let user = { Fname, Lname, email, password, role } as User;

        let addedUser = await dbAddUserEncrypted(user);
        return res.status(200).json({ status: "success", data: addedUser });
        // let response = await fetch(`/auth/local`,{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(req.body),

        // });
        // let responseData: any = await response.json();
        // if( response.status === 200){
        //     return res.status(200).json({status: "success", data: responseData.data});
        // }else{
        //     return res.status(400).json({status: "failure", data: responseData.data});
        // }
        // const response = await axios.post('https://localhost:4000/auth/local', req.body , {httpsAgent: new https.Agent({rejectUnauthorized: false})});
    } catch (error: ErrorWithStatusCode | any) {
        return res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export function logoutUser(req: Request, res: Response) {
    try {
        req.logOut((err) => {
            if (err) throw err;
        });
        req.session = null;
        return res.status(200).json({
            status: "success",
            data: "logged out successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            status: "failure",
            data: `Error logging out: ${error.message}`,
        });
    }
}

export async function forgetPassword(req: Request, res: Response) {
    // generate jwt token

    // TODO: wrap this in a util function
    try {
        console.log("JWT SECRET IS ", keys.JWT_SECRET);
        const token = jwt.sign({ email: req.body.email }, keys.JWT_SECRET, {
            expiresIn: "15m",
        });
        console.log({ token });
        const encodedToken = Buffer.from(token).toString("base64");
        console.log({ encodedToken });
        const resetPasswordLink = `${keys.FRONT_URL_DEV}/reset-password/${encodedToken}`;

        const email = await sendMail(resetPasswordLink, req.body.email);

        res.send({ status: "success", data: email });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 400).json({
            status: "failure",
            data: `Error sending email, ${error}`,
        });
    }
}

export async function resetPassword(req: Request, res: Response) {
    const { token, password } = req.body;
    const decodedToken = Buffer.from(token, "base64").toString("ascii");
    try {
        const verifyToken = jwt.verify(
            decodedToken,
            keys.JWT_SECRET
        ) as jwt.JwtPayload;
        // TODO: check if token is already used using redis
        if (verifyToken) {
            if (await redisClient.get(decodedToken)) {
                return res
                    .status(400)
                    .json({ status: "failure", data: "Token already used" });
            } else {
                let expTime =
                    verifyToken.exp && verifyToken.iat
                        ? verifyToken.exp - verifyToken.iat
                        : 3600;
                await redisClient.set(decodedToken, decodedToken);
                await redisClient.expire(decodedToken, expTime);
            }
        }
        console.log({ verifyToken });
        //TODO: update user's password in db
        // const hashedPassword = await encryptPassword(password);
        const updatedUser = await dbUpdateUserByEmail(verifyToken.email, {
            password: password,
        });
        // const updatedUserTest = await dbGetUserByEmail(verifyToken.email);
        // console.table(updatedUserTest);
        res.status(200).json({
            status: "success",
            data: `Token verified and password changed`,
        });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            data: `Token not verified, ${error}`,
        });
    }
}

export function successfulAuth(req: Request, res: Response) {
    console.log("Session is ", req.session);
    console.log("User is ", req.user);
    res.status(200).send({ status: "success", data: "logged in successfully" });
}

export function failedAuth(req: Request, res: Response) {
    res.status(401).send({
        status: "failure",
        data: "Invalid email or password",
    });
}
