import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";

async function controllerLookupAuthSetter(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    try {

        let authArray = (req.cookies[AUTH_ARRAY_NAME] as string || "").split(".");

        if (!authArray.length) return throwError(res, 601);

        authArray = authArray.filter((item, index) => item && authArray.indexOf(item) === index);

        setAuthValues(req, "auth", authArray);

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookupAuthSetter;
