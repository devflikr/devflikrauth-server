import uuid from "./uuid";
import { DEVICE_TOKEN_NAME } from "../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/express";
import setAuthValues from "./authValues";
import throwError from "../tools/error";
import UserDevice from "../mongodb/models/UserDevice";
import setResponseCookies from "./cookies";

export async function generateDeviceUUID(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    let token = req.cookies[DEVICE_TOKEN_NAME];
    if (!token) {
        token = uuid();

        const ipAddress = req.ip;
        const browser = req.useragent?.browser || "unknown";
        const device = req.useragent?.isDesktop ? "desktop" : req.useragent?.isTablet ? "tablet" : req.useragent?.isSmartTV ? "tv" : req.useragent?.isMobile ? "mobile" : "unknown";
        const operator = req.useragent?.os || "unknown";
        const platform = req.useragent?.platform || "unknown";

        try {

            await UserDevice.create({
                token,
                os: operator,
                platform,
                device,
                browser,
                ip: ipAddress,
            });

        } catch (error) {
            console.log(error);
            throwError(res, 601);
        }
    }

    setAuthValues(req, "device", token);

    setResponseCookies(res, DEVICE_TOKEN_NAME, token);

    next();
}

const deviceUUID = {
    generateDeviceUUID,
};

export default deviceUUID;
