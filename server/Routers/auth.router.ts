import { Router, Request, Response } from "express";
import passport from "passport";

import {
    signUpUser,
    successfulAuth,
    failedAuth,
    logoutUser,
    resetPassword,
    forgetPassword,
} from "../controller/auth.controller";
import {
    mwValidateUser,
    mwCheckUserExists,
    mwCheckLoginCredentials,
    mwCheckLoginStatus,
} from "../middlewares/auth/user.middleware";

const authRouter = Router();

authRouter.post("/signup", mwValidateUser, mwCheckUserExists, signUpUser);

authRouter.post(
    "/local",
    mwCheckLoginStatus("login"),
    // mwCheckLoginCredentials,
    passport.authenticate("local", {
        failureRedirect: "/auth/failure",
        successRedirect: "/auth/success",
        session: true,
    }),
    (req: Request, res: Response) => {
        const { rememberMe } = req.body;
        if (rememberMe) {
            req.sessionOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        }
    }
);

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure",
        successRedirect: "/auth/success",
        session: true,
    })
);

// authRouter.get(
//     "/facebook",
//     passport.authenticate("facebook", { scope: ["profile", "email"] })
// );
// authRouter.get(
//     "/facebook/callback",
//     passport.authenticate("facebook", {
//         failureRedirect: "/auth/failure",
//         successRedirect: "/auth/success",
//         session: true,
//     })
// );

authRouter.post("/forgot-password", forgetPassword);

authRouter.post("/reset-password", resetPassword);
authRouter.delete("/logout", mwCheckLoginStatus("logout"), logoutUser);

authRouter.use("/failure", failedAuth);
authRouter.use("/success", successfulAuth);
export default authRouter;
