import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import UserSession from "../../mongodb/models/UserSession";
import UserSessions from "../../types/UserSessions";
import successResponse from "../../tools/success";
import UserDevice from "../../mongodb/models/UserDevice";
import { Document } from "mongoose";

async function controllerSessions(req: ExpressRequest, res: ExpressResponse) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, session } = req.authValues;

    if (!uid) throwError(res, 502, "uid");
    if (!session) throwError(res, 502, "session");

    try {

        const allUserSessions = await UserSession.find({ uid: new ObjectId(uid) });

        const result: UserSessions[] = [];
        const allDevices: {
            [key: string]: (Document<unknown, object, {
                device: string;
                token: string;
                os: string;
                platform: string;
                browser: string;
                ip: string;
                connectedAt: Date;
            }> & {
                device: string;
                token: string;
                os: string;
                platform: string;
                browser: string;
                ip: string;
                connectedAt: Date;
            })
        } = {};

        for (const ses of allUserSessions) {
            const device = allDevices[ses.device] || await UserDevice.findOne({ token: ses.device });
            device && (allDevices[ses.device] = device);
            result.push({
                uid,
                createdAt: ses.createdAt,
                expiredAt: ses.expiredAt,

                current: session === ses._id.toString(),
                deviceToken: ses.device,
                sessionToken: ses._id.toString(),


                ip: device?.ip,
                os: device?.os,
                device: device?.device,
                browser: device?.browser,
                platform: device?.platform,
                connectedAt: device?.connectedAt,
            });
        }

        return successResponse(res, "", { data: result });

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    // next();
}

export default controllerSessions;
