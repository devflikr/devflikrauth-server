import isEmpty from "validator/lib/isEmpty";

import throwError from "../tools/error";
import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkPasswordOld(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const password = (req.body["old-password"] as string || "");

    if (validatePassword(res, password) === true) setAuthValues(req, "password", password) && next();
}

export function validatePassword(res: ExpressResponse, password: string) {

    if (isEmpty(password)) return throwError(res, 408);

    return true;
}

export default checkPasswordOld;