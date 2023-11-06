import throwError from "../../tools/error";
import setAuthValues from "../../util/authValues";
import UserName from "../../mongodb/models/UserName";
import UserEntry from "../../mongodb/models/UserEntry";
import securePassword from "../../util/securePassword";
import UserDetail from "../../mongodb/models/UserDetail";
import { generateUniqueUsername } from "../../util/generator";
import generateUserUniqueProfilePicture from "../../util/userProfilePicture";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerRegister(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    if (!req.authValues) return throwError(req, res, 501);

    const { email, password } = req.authValues;

    if (!email) return throwError(req, res, 502, "email");
    if (!password) return throwError(req, res, 502, "password");

    try {
        const existingUserEntry = await UserEntry.findOne({ email });

        if (existingUserEntry) return throwError(req, res, 602);

        const hashedPassword = await securePassword(req, res, password);

        const userEntry = await UserEntry.create({ email, password: hashedPassword });

        const generatedUsername = generateUniqueUsername();

        await UserDetail.create({
            uid: userEntry._id,
            email,
            username: generatedUsername,
            profile: generateUserUniqueProfilePicture(generatedUsername),
        });

        await UserName.create({
            uid: userEntry._id,
            email,
            username: generatedUsername.toLowerCase(),
        });

        setAuthValues(req, "uid", userEntry._id.toString());

        next();

    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }

}

export default controllerRegister;
