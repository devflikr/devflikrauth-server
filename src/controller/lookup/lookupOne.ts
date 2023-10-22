import UserSession from "../../mongodb/models/UserSession";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { AUTH_ARRAY_NAME } from "../../types";
import { ExpressRequest, ExpressResponse } from "../../types/express";
import Lookup from "../../types/lookup";
import UserDetail from "../../mongodb/models/UserDetail";
import setResponseCookies from "../../util/cookies";
import { ObjectId } from "mongodb";

async function controllerLookupOne(req: ExpressRequest, res: ExpressResponse) {

    const authUser = parseInt(req.body["auth"] as string);

    if (!req.authValues) return throwError(res, 501);

    const { auth, device } = req.authValues;


    if (!auth) return throwError(res, 502, "auth");
    if (!device) return throwError(res, 502, "device");

    try {

        let result: Lookup | null = null;

        const session = auth[authUser];

        if (!session) return throwError(res, 502, "session");

        const existingUserSession = await UserSession.findById(new ObjectId(session));

        if (existingUserSession) {
            const existingUserDetail = await UserDetail.findOne({
                uid: existingUserSession.uid,
            });
            result = {
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
                index: authUser,
            };

        } else {
            auth.splice(auth.indexOf(session), 1);
            setResponseCookies(res, AUTH_ARRAY_NAME, auth.join("."));
        }


        if (!result) return throwError(res, 604);

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLookupOne;
