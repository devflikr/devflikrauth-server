import isEmpty from "validator/lib/isEmpty";

import throwError from "../tools/error";
import setAuthValues from "../util/authValues";
import bannedUsernames from "../assets/banned-usernames.json";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkUsername(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const username = (req.body["username"] as string || "");

    if (validateUsername(req, res, username) === true) setAuthValues(req, "username", username.trim()) && next();
}

export function validateUsername(req: ExpressRequest, res: ExpressResponse, username: string, isBanned: boolean = true) {

    username = username.trim();

    if (isEmpty(username)) return throwError(req, res, 101);

    if (username.length < 4 || username.length > 64) return throwError(req, res, 102);

    const validCharactersRegex = /^[A-Za-z0-9_.-]+$/;
    if (!validCharactersRegex.test(username)) return throwError(req, res, 103);

    const validCharactersUsageRegex = /^[A-Za-z][A-Za-z0-9_.-]*[A-Za-z0-9]$/;
    if (!validCharactersUsageRegex.test(username)) return throwError(req, res, 104);

    username = username.toLowerCase();

    if (isBanned && bannedUsernames.includes(username)) return throwError(req, res, 105);

    return true;
}
export default checkUsername;