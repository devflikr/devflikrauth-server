import UserDetail from "../../mongodb/models/UserDetail";
import UserEntry from "../../mongodb/models/UserEntry";
import UserName from "../../mongodb/models/UserName";
import console from "../../tools/console";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";
import { generateUniqueUsername } from "../../util/generator";
import securePassword from "../../util/securePassword";

async function controllerRegister(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    if (!req.authValues) return throwError(res, 501);

    const { email, password } = req.authValues;

    if (!email) return throwError(res, 502, "email");
    if (!password) return throwError(res, 502, "password");

    try {
        const existingUserEntry = await UserEntry.findOne({ email });

        if (existingUserEntry) return throwError(res, 602);

        const hashedPassword = await securePassword(res, password);

        const userEntry = await UserEntry.create({ email, password: hashedPassword });

        const generatedUsername = generateUniqueUsername();

        await UserDetail.create({
            uid: userEntry._id,
            email,
            username: generatedUsername,
        });

        await UserName.create({
            email,
            username: generatedUsername.toLowerCase(),
        })

        setAuthValues(req, "uid", userEntry._id.toString());

        next();

    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }

}

export default controllerRegister
