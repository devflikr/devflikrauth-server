import { ObjectId } from "mongodb";

import Lookup from "../../types/Lookup";
import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import successResponse from "../../tools/success";
import setResponseCookies from "../../util/cookies";
import UserDetail from "../../mongodb/models/UserDetail";
import UserSession from "../../mongodb/models/UserSession";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

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
                    index: forIndex++,
                    email: existingUserDetail?.email || "",
                    username: existingUserDetail?.username || "",
                    deviceToken: device,
                    sessionToken: session,

                    phone: existingUserDetail?.phone,
                    gender: existingUserDetail?.gender,
                    profile: existingUserDetail?.profile,
                    birthday: existingUserDetail?.birthday,
                    lastname: existingUserDetail?.lastname,
                    firstname: existingUserDetail?.firstname,
                    createdAt: existingUserDetail?.createdAt,
                    updatedAt: existingUserDetail?.updatedAt,
                    isVerified: existingUserDetail?.isVerified,
                    passwordUpdatedAt: existingUserDetail?.passwordUpdatedAt,
                });

            } else {
                auth.splice(auth.indexOf(session), 1);
            }
        }

        setResponseCookies(res, AUTH_ARRAY_NAME, auth.join("."));

        if (!result.length) return throwError(res, 605);

        return successResponse(res, "", { auth: result });
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookup;
