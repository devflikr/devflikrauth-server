import throwError from "../../tools/error";
import { AUTH_ARRAY_INDEX_NAME, AUTH_ARRAY_NAME } from "../../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";


async function controllerUpdateAuthArray(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { session } = req.authValues;

    if (!session) return throwError(res, 502, "session");

    try {
        let authArray = (req.cookies[AUTH_ARRAY_NAME] as string || "").split(".");

        if (!authArray.includes(session)) authArray.push(session);

        authArray = authArray.filter((item, index) => item && authArray.indexOf(item) === index);

        const newIndex = authArray.indexOf(session);

        res.cookie(AUTH_ARRAY_NAME, authArray.join("."));
        res.cookie(AUTH_ARRAY_INDEX_NAME, newIndex);

        setAuthValues(req, "auth", authArray);
        setAuthValues(req, "index", newIndex);

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerUpdateAuthArray;
