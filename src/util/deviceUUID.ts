import uuid from "./uuid";
import throwError from "../tools/error";
import setAuthValues from "./authValues";
import setResponseCookies from "./cookies";
import { AUTH_ARRAY_NAME, DEVICE_TOKEN_NAME } from "../types";
import UserDevice from "../mongodb/models/UserDevice";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

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
            throwError(req, res, 601);
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

export function handleDeviceTransport(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const cookieString = req.headers["authorization"];

    if (cookieString) {
        try {
            const cookie: { a?: string; d?: string; } = JSON.parse(cookieString);

            req.cookies[AUTH_ARRAY_NAME] = cookie.a;
            req.cookies[DEVICE_TOKEN_NAME] = cookie.d;

        } catch (error) {
            console.log(error);
            throwError(req, res, 601);
        }
    }

    next();

}
