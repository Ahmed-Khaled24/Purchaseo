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
    mwCheckLoginStatus("loggedOut"),
    passport.authenticate("local", {
        failureRedirect: "/auth/failure",
        successRedirect: "/auth/success",
        session: true,
    })
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
authRouter.delete("/logout", mwCheckLoginStatus("loggedIn"), logoutUser);

authRouter.use("/failure", failedAuth);
authRouter.use("/success", successfulAuth);
export default authRouter;
