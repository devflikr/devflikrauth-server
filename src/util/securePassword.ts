import { compare, hash } from "bcrypt";

import throwError from "../tools/error";
import { ExpressResponse } from "../types/Express";

async function securePassword(res: ExpressResponse, password: string) {
    try {
        return await hash(password, +(process.env.SECURE_BCRYPT_ROUNDS as string) || 10);
    } catch (error) {
        console.log(error);
        throwError(res, 408);
    }
}


export async function secureValidatePassword(res: ExpressResponse, hashedPassword: string, password: string) {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        console.log(error);
        throwError(res, 408);
    }
}

export default securePassword;
