import { ExpressResponse } from "../../types/express";

function successResponse(res: ExpressResponse, message: string, data?: any) {
    return res.json({
        success: true,
        status: "success",
        message: message,
        data: data,
    });
}


export default successResponse;
