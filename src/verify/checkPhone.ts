import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkPhone(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const phone = req.body["phone"];

    setAuthValues(req, "phone", phone);

    next();
}

export default checkPhone;