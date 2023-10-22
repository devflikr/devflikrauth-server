import UserSession from "../../mongodb/models/UserSession";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { AUTH_ARRAY_NAME } from "../../types";
import { ExpressRequest, ExpressResponse } from "../../types/express";
import Lookup from "../../types/lookup";
import UserDetail from "../../mongodb/models/UserDetail";
import setResponseCookies from "../../util/cookies";
import { ObjectId } from "mongodb";

async function controllerLookup(req: ExpressRequest, res: ExpressResponse) {

    if (!req.authValues) return throwError(res, 501);

    const { auth, device } = req.authValues;


    if (!auth) return throwError(res, 502, "auth");
    if (!device) return throwError(res, 502, "device");

    try {

        const result: Lookup[] = [];

        let forIndex = 0;

        for (const session of [...auth]) {

            const existingUserSession = await UserSession.findById(new ObjectId(session));

            if (existingUserSession && !existingUserSession.expiredAt) {
                const existingUserDetail = await UserDetail.findOne({
                    uid: existingUserSession.uid,
                });
                result.push({
                    uid: existingUserSession.uid.toString(),
                    email: existingUserDetail?.email,
                    phone: existingUserDetail?.phone,
                    profile: existingUserDetail?.profile,
                    lastname: existingUserDetail?.lastname,
                    username: existingUserDetail?.username,
                    firstname: existingUserDetail?.firstname,
                    isVerified: existingUserDetail?.isVerified,
                    sessionToken: session,
                    deviceToken: device,
                    index: forIndex++,
                });

            } else {
                auth.splice(auth.indexOf(session), 1);
            }
        }

        setResponseCookies(res, AUTH_ARRAY_NAME, auth.join("."));

        if (!result.length) return throwError(res, 605);

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookup;
