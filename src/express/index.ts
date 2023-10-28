import cookieParser from "cookie-parser";
import express, { Express } from "express";
import cors from "cors";
import console from "../tools/console";
import accountsRouter from "../routes";
import { generateDeviceUUID } from "../util/deviceUUID";
import userAgent from "express-useragent";
import morgan from "morgan";

const expressApp: Express = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(userAgent.express());
expressApp.use(morgan("dev"));
expressApp.use(cors({
    origin: [
        "http://localhost:5200",
        "http://localhost:5201",
        "http://localhost:5202",
        "http://localhost:5203",
        "http://localhost:5204",
        "http://localhost:5205",
        "http://localhost:5206",
        "http://localhost:5207",
        "http://localhost:5208",
        "http://localhost:5209",
    ],
    credentials: true,
}));

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