import UserEntry from "../../mongodb/models/UserEntry";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";
import { secureValidatePassword } from "../../util/securePassword";

async function controllerLogin(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { email, password } = req.authValues;

    if (!email) return throwError(res, 502, "email");
    if (!password) return throwError(res, 502, "password");

    try {
        const existingUserEntry = await UserEntry.findOne({ email });

        if (!existingUserEntry) return throwError(res, 603);

        const isPasswordMatching = await secureValidatePassword(res, existingUserEntry.password, password);

        if (!isPasswordMatching) return throwError(res, 409);

        setAuthValues(req, "uid", existingUserEntry._id.toString());

        next();


    } catch (error) {
        console.error(error);
        return throwError(res, 601);
    }
}

export default controllerLogin;
