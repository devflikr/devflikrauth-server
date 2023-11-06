/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressResponse } from "../../types/Express";

function successResponse(res: ExpressResponse, message: string, data?: object) {
    return res.json({
        success: true,
        status: "success",
        message: message,
        ...(data || {}),
    });
}


export default successResponse;
