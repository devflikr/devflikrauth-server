import UserSession from "../../mongodb/models/UserSession";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";
import { ObjectId } from "mongodb";

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

        console.log(userSession);

        setAuthValues(req, "session", userSession._id.toString());

        next();
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerCreateUserToken;
