import { CookieOptions } from "express";
import { ExpressResponse } from "../types/Express";

export default function setResponseCookies(res: ExpressResponse, name: string, value: string | number | null, config: CookieOptions = {}) {
    return res.cookie(name, value, {
        domain: "localhost",
        expires: (value == null ? new Date(Date.now()) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)),
        sameSite: "none",
        path: "/",
        ...config,
    });
}