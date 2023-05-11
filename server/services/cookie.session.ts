import cookieSession from "cookie-session";
import keys from "../config/keys";
const cookieSessionOptions = {
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.COOKIE_KEY1, keys.COOKIE_KEY2],
};

export const cookieSessionMiddleware = cookieSession(cookieSessionOptions);
