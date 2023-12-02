import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userAgent from "express-useragent";
import express, { Express } from "express";

import accountsRouter from "../routes";
import { generateDeviceUUID, handleDeviceTransport } from "../util/deviceUUID";
import { resolve } from "path";

const expressApp: Express = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(userAgent.express());
expressApp.use(morgan("dev"));
expressApp.use(cors({
    origin: [
        /^https:\/\/(?:[a-zA-Z0-9-]+\.)?devflikr\.com$/,
        /^http:\/\/localhost:(5\d{3}|5999)$/,
    ],
    credentials: true,
}));
expressApp.use(handleDeviceTransport);
expressApp.use(generateDeviceUUID);

expressApp.use(express.static(resolve("public")));

expressApp.listen(process.env.PORT, () => {
    console.log(`⚔️  api @port ${process.env.PORT}`);
});

expressApp.get("/health", (req, res) => {
    res.sendStatus(200);
});

expressApp.use(accountsRouter);