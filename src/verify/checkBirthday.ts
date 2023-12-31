import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";
import throwError from "../tools/error";

function checkBirthDay(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const birthday = (req.body["birthday"] as string || "");

    if (birthday && isNaN(new Date(birthday).getTime())) return throwError(req, res, 504);

    setAuthValues(req, "birthday", birthday == null ? undefined : new Date(birthday));

    next();
}

export default checkBirthDay;