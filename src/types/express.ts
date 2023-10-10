import { NextFunction, Request, Response } from "express";
import AuthValues from './authValues';

export interface ExpressRequest extends Request {
    authValues?: AuthValues;
}

export interface ExpressResponse extends Response {

}

export interface ExpressNextFunction extends NextFunction {

}