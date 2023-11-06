import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import setAuthValues from "../../util/authValues";
import UserSession from "../../mongodb/models/UserSession";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerSessionToUserID(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { session } = req.authValues;

    if (!session) throwError(req, res, 502, "session");

    try {
        const existingUserSession = await UserSession.findById(new ObjectId(session));

        if (!existingUserSession || existingUserSession.expiredAt) return throwError(req, res, 607);

        setAuthValues(req, "uid", existingUserSession.uid.toString());

    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }

    next();
}

export default controllerSessionToUserID;
