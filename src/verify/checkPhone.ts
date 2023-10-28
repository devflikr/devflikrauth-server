import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/express";
import setAuthValues from "../util/authValues";

function checkPhone(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const phone = req.body["phone"];

    setAuthValues(req, "phone", phone);

    next();
}

export default checkPhone;