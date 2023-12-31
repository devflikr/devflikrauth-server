/* eslint-disable @typescript-eslint/no-explicit-any */
import errors from "./errors";
import { ErrorCode } from "../../types/ErrorCode";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

function throwError(req: ExpressRequest, res: ExpressResponse, errorKey: number, ...data: any) {

    const error = getErrorDataByKey(errorKey);

    return res.status(error?.code || 404).json({
        error: true,
        status: "error",
        message: error?.message,
        deviceToken: req?.authValues?.device,
        code: error?.code,
        type: error?.type,
        data: data
    }), false;
}

function getErrorDataByKey(key: number): ErrorCode | null {
    const errorChart = errors as { [key: string]: any };
    for (const host in errorChart) {
        const hostChart = errorChart[host] as { [key: string]: any };
        for (const path in hostChart) {
            const pathChart = hostChart[path] as { [key: string]: any };
            if (pathChart.key === key) {
                return pathChart as ErrorCode;
            }
        }
    }
    console.error("No error key found for", key);
    return null;
}

export default throwError;
