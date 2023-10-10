import UserSession from "../../mongodb/models/UserSession";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { AUTH_ARRAY_INDEX_NAME, AUTH_ARRAY_NAME } from "../../types";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import Lookup from '../../types/lookup';
import UserDetail from "../../mongodb/models/UserDetail";

async function controllerLookup(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    const authUser = parseInt(req.body["auth"] as string);

    if (!req.authValues) return throwError(res, 501);

    const { auth, index, device } = req.authValues;

    if (!auth) return throwError(res, 502, "auth");
    if (!device) return throwError(res, 502, "device");
    if (index == null) return throwError(res, 502, "index");

    try {

        const result: Lookup[] = [];
        let modified;

        for (let session of [...auth]) {
            const existingUserSession = await UserSession.findById(session);

            if (existingUserSession && !existingUserSession.expiredAt) {
                const existingUserDetail = await UserDetail.findOne({
                    uid: existingUserSession.uid,
                });
                result.push({
                    uid: existingUserSession.uid.toString(),
                    name: existingUserDetail?.name,
                    email: existingUserDetail?.email,
                    phone: existingUserDetail?.phone,
                    profile: existingUserDetail?.profile,
                    username: existingUserDetail?.username,
                    isVerified: existingUserDetail?.isVerified,
                    sessionToken: session,
                    deviceToken: device,
                });

            } else {
                auth.splice(auth.indexOf(session), 1);
                modified = true;
            }
        }

        if (modified) {
            let newIndex = index;

            if (auth[newIndex] !== result[newIndex]?.sessionToken) newIndex = auth.length ? 0 : -1;
            if (newIndex >= auth.length) newIndex = 0;

            res.cookie(AUTH_ARRAY_NAME, auth.join("."));
            res.cookie(AUTH_ARRAY_INDEX_NAME, newIndex);
        }

        if (!Number.isNaN(authUser)) {
            return result[authUser] ? successResponse(res, "", result[authUser]) : throwError(res, 604, authUser);
        }

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookup;
