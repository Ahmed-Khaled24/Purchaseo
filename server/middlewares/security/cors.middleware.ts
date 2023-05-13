import cors from "cors";
export const corsMiddleware = cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
});