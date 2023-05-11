import express from "express";

import globalRouter from "./Routers";
import cookieSession from "cookie-session";
import helmet from "helmet";
import cors from "cors";

import "./services/passport";
import passport from "passport";
import { cookieSessionMiddleware } from "./services/cookie.session";

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(helmet());
api.use(cors());
api.use(cookieSessionMiddleware);
api.use(passport.initialize());
api.use(passport.session());
api.use("/", globalRouter);

export default api;
