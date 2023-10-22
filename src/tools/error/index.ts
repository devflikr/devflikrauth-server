import errors from "./errors";
import { ErrorCode } from "../../types/error";
import { ExpressResponse } from "../../types/express";
import console from "../console";

function throwError(res: ExpressResponse, errorKey: number, ...data: any) {

    const error = getErrorDataByKey(errorKey);

    return res.status(error?.code || 404).json({
        error: true,
        status: "error",
        message: error?.message,
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

    return console.error("No error key found for", key) && null;
}

export default throwError;
