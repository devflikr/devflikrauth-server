import throwError from "../../tools/error";
import { AUTH_ARRAY_INDEX_NAME, AUTH_ARRAY_NAME } from "../../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";

async function controllerLookupCustomPath(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    try {
        req.body["auth"] = req.params.authID;

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookupCustomPath;
