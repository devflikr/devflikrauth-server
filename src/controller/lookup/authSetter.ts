import throwError from "../../tools/error";
import { AUTH_ARRAY_INDEX_NAME, AUTH_ARRAY_NAME } from "../../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";

async function controllerLookupAuthSetter(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    try {

        let authArray = (req.cookies[AUTH_ARRAY_NAME] as string || "").split(".");
        let newIndex = parseInt(req.cookies[AUTH_ARRAY_INDEX_NAME] as string) || 0;

        authArray = authArray.filter((item, index) => item && authArray.indexOf(item) === index);

        if (newIndex >= authArray.length) newIndex = 0;

        setAuthValues(req, "auth", authArray);
        setAuthValues(req, "index", newIndex);

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookupAuthSetter;
