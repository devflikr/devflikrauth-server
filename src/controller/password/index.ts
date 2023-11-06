import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import UserEntry from "../../mongodb/models/UserEntry";
import { secureValidatePassword } from "../../util/securePassword";

async function controllerPasswordOld(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, password } = req.authValues;

    if (!uid) throwError(res, 502, "uid");
    if (!password) throwError(res, 502, "password");

    try {

        const existingUserEntry = await UserEntry.findById(new ObjectId(uid));

        if (!existingUserEntry) return throwError(res, 603);

        const isPasswordMatching = await secureValidatePassword(res, existingUserEntry.password, password as string);

        if (!isPasswordMatching) return throwError(res, 411);

        req.body["password"] = req.body["new-password"];

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    next();
}

export default controllerPasswordOld;
