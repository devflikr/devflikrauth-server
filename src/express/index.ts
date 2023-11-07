import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userAgent from "express-useragent";
import express, { Express } from "express";

import accountsRouter from "../routes";
import { generateDeviceUUID, handleDeviceTransport } from "../util/deviceUUID";

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

expressApp.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});

expressApp.get("/test", (req, res) => {
    res.json(req.query || {});
});

expressApp.get("/", (req, res) => {
    res.send("<center><h2>If you are seeing this, it means the server is working well.<hr />Just close this tab and go back to sleep. Good night...</h2></center>");
});

expressApp.use(accountsRouter);