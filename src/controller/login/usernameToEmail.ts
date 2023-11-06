import throwError from "../../tools/error";
import setAuthValues from "../../util/authValues";
import UserName from "../../mongodb/models/UserName";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerUsernameToEmail(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {

    if (!req.authValues) return throwError(req, res, 501);

    const { username, email } = req.authValues;

    if (!email && username) {
        try {
            const existingUserName = await UserName.findOne({ username });

            if (!existingUserName) return throwError(req, res, 302);

            setAuthValues(req, "email", existingUserName.email);

        } catch (error) {
            console.error(error);
            return throwError(req, res, 601);
        }
    }

    next();
}

export default controllerUsernameToEmail;
