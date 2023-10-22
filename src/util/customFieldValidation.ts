import isEmpty from "validator/lib/isEmpty";
import { ExpressRequest, ExpressResponse } from "../types/express";

export interface CustomFieldValidations {
    required?: boolean;
    type?: "string" | "email" | "number";
    trim?: boolean;
}
function customFieldValidation(name: string, series: number, validations: CustomFieldValidations = {}) {
    return function (req: ExpressRequest, res: ExpressResponse) {
        const value = req.body[name];

        if (validations.required && isEmpty(value)) return null;
        return res.send("Register");
    };
}

export default customFieldValidation;
