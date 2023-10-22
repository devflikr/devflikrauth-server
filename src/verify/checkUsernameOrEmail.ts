import isEmpty from "validator/lib/isEmpty";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/express";
import throwError from "../tools/error";
import isEmail from "validator/lib/isEmail";
import { validateEmail } from "./checkEmail";
import { validateUsername } from "./checkUsername";
import setAuthValues from "../util/authValues";

function checkUsernameOrEmail(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const username = (req.body["username"] as string || "");

    const token = validateUsernameOrEmail(res, username);

    if (token !== null) setAuthValues(req, token, username.trim().toLowerCase()) && next();
}

export function validateUsernameOrEmail(res: ExpressResponse, username: string): "username" | "email" | null {

    username = username.trim();

    if (isEmpty(username)) return throwError(res, 301), null;

    if (isEmail(username)) {
        return validateEmail(res, username) === true ? "email" : null;
    } else {
        return validateUsername(res, username, false) === true ? "username" : null;
    }
}

export default checkUsernameOrEmail;