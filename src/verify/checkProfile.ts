import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkProfile(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const profile = req.body["profile"];

    setAuthValues(req, "profile", profile);

    next();
}

export default checkProfile;