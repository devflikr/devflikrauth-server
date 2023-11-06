import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import UserEntry from "../../mongodb/models/UserEntry";
import securePassword from "../../util/securePassword";
import UserDetail from "../../mongodb/models/UserDetail";

async function controllerPasswordNew(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, password } = req.authValues;

    if (!uid) throwError(res, 502, "uid");
    if (!password) throwError(res, 502, "password");

    try {

        const existingUserEntry = await UserEntry.findById(new ObjectId(uid));

        if (!existingUserEntry) return throwError(res, 603);

        const hashedPassword = await securePassword(res, password as string);

        await existingUserEntry.updateOne({ password: hashedPassword });

        await UserDetail.updateOne({ uid: new ObjectId(uid) }, { passwordUpdatedAt: Date.now() });

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    next();
}

export default controllerPasswordNew;
