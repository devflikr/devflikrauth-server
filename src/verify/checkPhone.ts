import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/express";
import setAuthValues from "../util/authValues";

function checkPhone(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const profile = req.body["profile"];

    setAuthValues(req, "profile", profile);

    next();
}

export default checkPhone;