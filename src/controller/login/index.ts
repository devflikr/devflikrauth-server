import throwError from "../../tools/error";
import setAuthValues from "../../util/authValues";
import UserEntry from "../../mongodb/models/UserEntry";
import { secureValidatePassword } from "../../util/securePassword";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerLogin(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { email, password } = req.authValues;

    if (!email) return throwError(req, res, 502, "email");
    if (!password) return throwError(req, res, 502, "password");

    try {
        const existingUserEntry = await UserEntry.findOne({ email });

        if (!existingUserEntry) return throwError(req, res, 603);

        const isPasswordMatching = await secureValidatePassword(req, res, existingUserEntry.password, password);

        if (!isPasswordMatching) return throwError(req, res, 409);

        setAuthValues(req, "uid", existingUserEntry._id.toString());

        next();
    } catch (error) {
        console.error(error);
        return throwError(req, res, 601);
    }
}

export default controllerLogin;
