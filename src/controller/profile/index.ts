import { ObjectId } from "mongodb";
import UserDetail from "../../mongodb/models/UserDetail";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import generateUserUniqueProfilePicture from "../../util/userProfilePicture";

async function controllerProfile(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { uid, firstname, lastname, profile, phone } = req.authValues;

    if (!uid) throwError(res, 502, "uid");

    console.log(phone);

    try {

        await UserDetail.updateOne({ uid: new ObjectId(uid) }, {
            firstname: firstname || null,
            lastname: lastname || null,
            profile: profile || generateUserUniqueProfilePicture(firstname + " " + lastname),
            phone: phone || null,
        });

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

    next();
}

export default controllerProfile;
