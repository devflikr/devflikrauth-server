import throwError from "../tools/error";
import AuthValues from "../types/AuthValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

type AuthValue<T extends keyof AuthValues> = AuthValues[T];

function setAuthValues<T extends keyof AuthValues>(req: ExpressRequest, key: T, value: AuthValue<T>): true {
    req.authValues = req.authValues || {};
    req.authValues[key] = value;
    return true;
}

export default setAuthValues;


export function validateAuthValues(authKeys: Array<keyof AuthValues>) {
    return function (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
        if (!req.authValues) return throwError(req, res, 501);

        for (const key of authKeys) {
            if (req.authValues[key] == null) return throwError(req, res, 502, key);
        }

        next();
    };
}
