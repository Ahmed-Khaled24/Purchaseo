import { Router, Request, Response } from "express";
import {
	addNewUser,
	removeUser,
	updateUser,
	getUserByEmail,
	getUserById,
    getCurrentUser,
} from "../controller/user.controller";
import {
	authorize,
	mwCheckIsCurrentUser,
	mwCheckLoginStatus,
} from "../middlewares/auth/user.middleware";
import { mwValidateData } from "../middlewares/validation/user.validations.middleware";

const userRouter = Router();
// TODO: do the role :^^: problem

userRouter.get("/", mwCheckLoginStatus("loggedIn"), getCurrentUser);
userRouter.get(
	"/id/:id([0-9]+)",
	mwCheckLoginStatus("loggedIn"),
	mwCheckIsCurrentUser,
	getUserById
);
userRouter.get(
	"/email/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,})",
	mwCheckIsCurrentUser,
	getUserByEmail
);
userRouter.post("/add", mwValidateData("signup"), addNewUser);
userRouter.patch(
	"/update",
	mwCheckLoginStatus("loggedIn"),
	mwCheckIsCurrentUser,
	mwValidateData("update"),
	updateUser
);
userRouter.delete(
	"/delete",
	mwCheckLoginStatus("loggedIn"),
	authorize("Admin"),
	removeUser
);
export default userRouter;
