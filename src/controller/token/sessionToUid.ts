import { ObjectId } from "mongodb";
import UserSession from "../../mongodb/models/UserSession";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";

async function controllerSessionToUserID(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { session } = req.authValues;

    if (!session) throwError(res, 502, "session");

    try {
        const existingUserSession = await UserSession.findById(new ObjectId(session));

        if (!existingUserSession || existingUserSession.expiredAt) return throwError(res, 607);

        setAuthValues(req, "uid", existingUserSession.uid.toString());

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    next();
}

export default controllerSessionToUserID;
