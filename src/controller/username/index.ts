import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import UserName from "../../mongodb/models/UserName";
import UserDetail from "../../mongodb/models/UserDetail";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerUsername(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, username } = req.authValues;

    if (!uid) throwError(res, 502, "uid");
    if (!username) throwError(res, 502, "username");

    try {

        const existingUserName = await UserName.findOne({ username: username?.toLowerCase() });

        console.log(username, existingUserName);

        if (existingUserName) return throwError(res, 106);

        await UserDetail.updateOne({ uid: new ObjectId(uid) }, {
            username,
        });

        await UserName.updateOne({ uid: new ObjectId(uid) }, {
            username: username?.toLowerCase(),
        });

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    next();
}

export default controllerUsername;
