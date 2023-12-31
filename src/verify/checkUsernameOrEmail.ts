import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

import throwError from "../tools/error";
import { validateEmail } from "./checkEmail";
import setAuthValues from "../util/authValues";
import { validateUsername } from "./checkUsername";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkUsernameOrEmail(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const username = (req.body["username"] as string || "");

    const token = validateUsernameOrEmail(req, res, username);

    if (token !== null) setAuthValues(req, token, username.trim().toLowerCase()) && next();
}

export function validateUsernameOrEmail(req: ExpressRequest, res: ExpressResponse, username: string): "username" | "email" | null {

    username = username.trim();

    if (isEmpty(username)) return throwError(req, res, 301), null;

    if (isEmail(username)) {
        return validateEmail(req, res, username) === true ? "email" : null;
    } else {
        return validateUsername(req, res, username, false) === true ? "username" : null;
    }
}

export default checkUsernameOrEmail;