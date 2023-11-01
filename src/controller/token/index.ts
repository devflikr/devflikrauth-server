import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import setAuthValues from "../../util/authValues";
import UserSession from "../../mongodb/models/UserSession";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerCreateUserToken(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, device } = req.authValues;

    if (!uid) return throwError(res, 502, "uid");
    if (!device) return throwError(res, 502, "device");

    try {

        const existingUserSession = await UserSession.findOne({
            uid: new ObjectId(uid),
            device,
            $or: [
                { expiredAt: null },
                { expiredAt: { $exists: false } }
            ]
        });

        const userSession = existingUserSession || await UserSession.create({
            uid: new ObjectId(uid),
            device,
        });

        setAuthValues(req, "session", userSession._id.toString());

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerCreateUserToken;
