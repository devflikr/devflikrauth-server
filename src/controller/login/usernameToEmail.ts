import UserEntry from "../../mongodb/models/UserEntry";
import UserName from "../../mongodb/models/UserName";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/express";
import setAuthValues from "../../util/authValues";

async function controllerUsernameToEmail(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(res, 501);

    const { username, email } = req.authValues;

    if (!email && username) {
        try {
            const existingUserName = await UserName.findOne({ username });

            if (!existingUserName) return throwError(res, 302);

            setAuthValues(req, "email", existingUserName.email);

        } catch (error) {
            console.error(error);
            return throwError(res, 601);
        }
    }

    next();
}

export default controllerUsernameToEmail;
