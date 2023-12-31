import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import UserSession from "../../mongodb/models/UserSession";
import setAuthValues from "../../util/authValues";

async function controllerRemoveSession(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { uid, session: currentSession, device: removeSession } = req.authValues;

    if (!uid) throwError(req, res, 502, "uid");
    if (!currentSession) throwError(req, res, 502, "session");
    if (!removeSession) throwError(req, res, 502, "session-to-remove");

    try {
        console.log(currentSession, removeSession);
        if (currentSession === removeSession) return throwError(req, res, 505);

        await UserSession.findByIdAndUpdate(new ObjectId(removeSession), { expiredAt: Date.now() });

    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }

    next();
}

export default controllerRemoveSession;


export async function controllerSessionSwitch(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const session = req.body["remove"];

    if (!session) return throwError(req, res, 606);

    setAuthValues(req, "device", session);

    next();
}