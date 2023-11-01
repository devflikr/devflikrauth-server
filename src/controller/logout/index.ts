import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import successResponse from "../../tools/success";
import setResponseCookies from "../../util/cookies";
import UserSession from "../../mongodb/models/UserSession";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerLogout(req: ExpressRequest, res: ExpressResponse) {


    if (!req.authValues) return throwError(res, 501);

    const { auth } = req.authValues;

    if (!auth || !auth.length) return successResponse(res, "No auth session exists", { auth: [] });

    try {
        for (const user of [...auth]) {
            await UserSession.updateOne({ _id: new ObjectId(user) }, { expiredAt: Date.now() });
        }

        setResponseCookies(res, AUTH_ARRAY_NAME, null);

        return successResponse(res, "All user sessions removed", { auth: [] });
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLogout;