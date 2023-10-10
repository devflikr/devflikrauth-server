import isEmpty from "validator/lib/isEmpty";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/express";
import throwError from "../tools/error";
import isEmail from "validator/lib/isEmail";
import setAuthValues from "../util/authValues";

function checkEmail(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const email = (req.body["email"] as string || "");

    if (validateEmail(res, email) === true) setAuthValues(req, "email", email.trim().toLowerCase()) && next();
}

export function validateEmail(res: ExpressResponse, email: string) {

    email = email.trim().toLowerCase();

    if (isEmpty(email)) return throwError(res, 201);

    if (!isEmail(email)) return throwError(res, 202);

    return true;
}

export default checkEmail;