import cors from "cors";
export const corsMiddleware = cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    optionsSuccessStatus: 200,
});