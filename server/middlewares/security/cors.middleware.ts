import cors from "cors";
export const corsMiddleware = cors({
    origin: "https://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
});