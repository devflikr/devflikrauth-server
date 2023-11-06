/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressRequest, ExpressResponse } from "../../types/Express";

function successResponse(req: ExpressRequest, res: ExpressResponse, message: string, data?: object) {
    return res.json({
        success: true,
        status: "success",
        message: message,
        deviceToken: req?.authValues?.device,
        ...(data || {}),
    });
}


export default successResponse;
