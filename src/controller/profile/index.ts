import { ObjectId } from "mongodb";

import throwError from "../../tools/error";
import UserDetail from "../../mongodb/models/UserDetail";
import generateUserUniqueProfilePicture from "../../util/userProfilePicture";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerProfile(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { uid, firstname, lastname, profile, phone, gender, birthday } = req.authValues;

    if (!uid) throwError(req, res, 502, "uid");

    try {

        await UserDetail.updateOne({ uid: new ObjectId(uid) }, {
            firstname: firstname || null,
            lastname: lastname || null,
            birthday: birthday ? birthday.getTime() || null : null,
            profile: profile || generateUserUniqueProfilePicture(firstname + " " + lastname),
            updatedAt: Date.now(),
            phone: phone || null,
            gender: gender,
        });

    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }

    next();
}

export default controllerProfile;
