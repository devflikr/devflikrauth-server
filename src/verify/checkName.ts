import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkName(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const firstname = (req.body["firstname"] as string || "").trim();
    const lastname = (req.body["lastname"] as string || "").trim();

    setAuthValues(req, "firstname", firstname);
    setAuthValues(req, "lastname", lastname);

    next();
}

export default checkName;