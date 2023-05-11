import { Router, Request, Response } from "express";
import {
    addNewUser,
    removeUser,
    updateUser,
    getUserByEmail,
    getUserById,
} from "../controller/user.controller";
import { mwValidateData } from "../middlewares/validation/user.validations.middleware";

const userRouter = Router();

// userRouter.get("/")
// make user be aple to get and update his own data
userRouter.get("/id/:id([0-9]+)", getUserById);
userRouter.get(
    "/email/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,})",
    getUserByEmail
);
userRouter.post("/add",mwValidateData("signup"), addNewUser);
userRouter.patch("/update", mwValidateData("update"), updateUser)
userRouter.delete("/delete", removeUser)
export default userRouter;
