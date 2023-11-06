import throwError from "../tools/error";
import setAuthValues from "../util/authValues";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";

function checkSession(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const session = req.body["session"];

    if (!session) return throwError(res, 606);

    setAuthValues(req, "session", session);

    next();
}

export default checkSession;