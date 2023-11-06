import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import setAuthValues from "../../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerLookupAuthSetter(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    try {

        let authArray = (req.cookies[AUTH_ARRAY_NAME] as string || "").split(".");

        if (!authArray.length) return throwError(req, res, 601);

        authArray = authArray.filter((item, index) => item && authArray.indexOf(item) === index);

        setAuthValues(req, "auth", authArray);

        next();
    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }
}

export default controllerLookupAuthSetter;
