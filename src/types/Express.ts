import AuthValues from "./AuthValues";
import { NextFunction, Request, Response } from "express";

export interface ExpressRequest extends Request {
    authValues?: AuthValues;
}

export interface ExpressResponse extends Response {

}

export interface ExpressNextFunction extends NextFunction {

}