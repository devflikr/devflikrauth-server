import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import setAuthValues from "../../util/authValues";
import setResponseCookies from "../../util/cookies";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";


async function controllerUpdateAuthArray(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { session } = req.authValues;

    if (!session) return throwError(res, 502, "session");

    try {
        let authArray = (req.cookies[AUTH_ARRAY_NAME] as string || "").split(".");

        if (!authArray.includes(session)) authArray.push(session);

        authArray = authArray.filter((item, index) => item && authArray.indexOf(item) === index);

        setResponseCookies(res, AUTH_ARRAY_NAME, authArray.join("."));

        setAuthValues(req, "auth", authArray);

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerUpdateAuthArray;
