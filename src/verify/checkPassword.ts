import isEmpty from "validator/lib/isEmpty";

import throwError from "../tools/error";
import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkPassword(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const password = (req.body["password"] as string || "");

    if (validatePassword(res, password) === true) setAuthValues(req, "password", password) && next();
}

export function validatePassword(res: ExpressResponse, password: string) {

    if (isEmpty(password)) return throwError(res, 401);

    if (password.length < 8) return throwError(res, 402);

    if (/\s/.test(password)) return throwError(res, 403);
    if (!/[A-Z]/.test(password)) return throwError(res, 404);
    if (!/[a-z]/.test(password)) return throwError(res, 405);
    if (!/[0-9]/.test(password)) return throwError(res, 406);
    if (!/[!@#$%^&*]/.test(password)) return throwError(res, 407);

    return true;
}

export default checkPassword;