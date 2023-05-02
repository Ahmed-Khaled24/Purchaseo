import { Router, Request, Response } from "express";
import {
    addNewUser,
    removeUser,
    updateUser,
    getUserByEmail,
    getUserById,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/id/:id([0-9]+)", getUserById);
userRouter.get(
    "/email/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,})",
    getUserByEmail
);
userRouter.route("/").post(addNewUser).delete(removeUser).patch(updateUser);

export default userRouter;
