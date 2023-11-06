import { ObjectId } from "mongodb";

import Lookup from "../../types/Lookup";
import throwError from "../../tools/error";
import { AUTH_ARRAY_NAME } from "../../types";
import successResponse from "../../tools/success";
import setResponseCookies from "../../util/cookies";
import UserDetail from "../../mongodb/models/UserDetail";
import UserSession from "../../mongodb/models/UserSession";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerLookupOne(req: ExpressRequest, res: ExpressResponse) {

    const authUser = parseInt(req.body["auth"] as string);

    if (!req.authValues) return throwError(req, res, 501);

    const { auth, device } = req.authValues;


    if (!auth) return throwError(req, res, 502, "auth");
    if (!device) return throwError(req, res, 502, "device");

    try {

        let result: Lookup | null = null;

        const session = auth[authUser];

        if (!session) return throwError(req, res, 502, "session");

        const existingUserSession = await UserSession.findById(new ObjectId(session));

        if (existingUserSession) {
            const existingUserDetail = await UserDetail.findOne({
                uid: existingUserSession.uid,
            });
            result = {
                uid: existingUserSession.uid.toString(),
                index: authUser,
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
            };

        } else {
            auth.splice(auth.indexOf(session), 1);
            setResponseCookies(res, AUTH_ARRAY_NAME, auth.join("."));
        }


        if (!result) return throwError(req, res, 604);

        return successResponse(req, res, "", { data: result });
    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }
}

export default controllerLookupOne;
