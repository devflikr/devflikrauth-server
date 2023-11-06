import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import UserEntry from "../../mongodb/models/UserEntry";
import { secureValidatePassword } from "../../util/securePassword";

async function controllerPasswordOld(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { uid, password } = req.authValues;

    if (!uid) throwError(req, res, 502, "uid");
    if (!password) throwError(req, res, 502, "password");

    try {

        const existingUserEntry = await UserEntry.findById(new ObjectId(uid));

        if (!existingUserEntry) return throwError(req, res, 603);

        const isPasswordMatching = await secureValidatePassword(req, res, existingUserEntry.password, password as string);

        if (!isPasswordMatching) return throwError(req, res, 411);

        req.body["password"] = req.body["new-password"];

    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }

    next();
}

export default controllerPasswordOld;
