import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";
import throwError from "../tools/error";

function checkGender(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const gender = (req.body["gender"] as string || "").toLowerCase();

    if (gender && !["male", "female", "null", "none"].includes(gender)) return throwError(req, res, 503);

    setAuthValues(req, "gender", gender);

    next();
}

export default checkGender;