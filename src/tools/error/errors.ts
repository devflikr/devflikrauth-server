import { ErrorCode } from "../../types/ErrorCode";

export interface ErrorType {
    username: {
        empty: ErrorCode; // 101
        length: ErrorCode; // 102
        invalid: ErrorCode; // 103
        usage: ErrorCode; // 104
        banned: ErrorCode; // 105
        taken: ErrorCode; // 106
    };
    email: {
        empty: ErrorCode; // 201
        invalid: ErrorCode; // 202
    };
    usernameOrEmail: {
        empty: ErrorCode; // 301
        invalid: ErrorCode; // 302
    };
    password: {
        empty: ErrorCode; // 401
        length: ErrorCode; // 402
        space: ErrorCode; // 403
        uppercase: ErrorCode; // 404
        lowercase: ErrorCode; // 405
        number: ErrorCode; // 406
        special: ErrorCode; // 407
        hashed: ErrorCode; // 408
        nomatch: ErrorCode; // 409
        oldpassword: ErrorCode; // 410
        nomatchold: ErrorCode; // 411
    };
    authValues: {
        empty: ErrorCode; // 501
        missing: ErrorCode; // 502
        gender: ErrorCode; // 503
        birthday: ErrorCode; // 504
        removesession: ErrorCode; // 505
    };
    auth: {
        error: ErrorCode; // 601
        exists: ErrorCode; // 602
        nouser: ErrorCode; // 603
        nolookup: ErrorCode; // 604
        emptylookup: ErrorCode; // 605
        session: ErrorCode; // 606
        expired: ErrorCode; // 607
    };
}

const errors: ErrorType = {
    username: {
        empty: {
            key: 101,
            code: 400,
            type: "request/username/empty",
            message: "Username is empty"
        },
        length: {
            key: 102,
            code: 400,
            type: "request/username/invalid-length",
            message: "Username must contain 4 to 64 characters"
        },
        invalid: {
            key: 103,
            code: 400,
            type: "request/username/invalid-characters",
            message: "Username contains invalid characters"
        },
        usage: {
            key: 104,
            code: 400,
            type: "request/username/invalid-character-usage",
            message: "Username must start with alphabets and end with alphanumerics only"
        },
        banned: {
            key: 105,
            code: 400,
            type: "request/username/banned-username",
            message: "Username contains banned words"
        },
        taken: {
            key: 106,
            code: 400,
            type: "request/username/banned-username",
            message: "Username is already taken"
        }
    },
    email: {
        empty: {
            key: 201,
            code: 400,
            type: "request/username/empty",
            message: "Email is empty"
        },
        invalid: {
            key: 202,
            code: 400,
            type: "request/username/invalid",
            message: "Email is invalid"
        },
    },
    usernameOrEmail: {
        empty: {
            key: 301,
            code: 400,
            type: "request/username/empty",
            message: "Username or email is empty"
        },
        invalid: {
            key: 302,
            code: 400,
            type: "auth/username/invalid",
            message: "Username is not associated with any email"
        },
    },
    password: {
        empty: {
            key: 401,
            code: 400,
            type: "request/password/empty",
            message: "Password is empty"
        },
        length: {
            key: 402,
            code: 400,
            type: "request/password/length",
            message: "Password must be at least 8 characters long"
        },
        space: {
            key: 403,
            code: 400,
            type: "request/password/space",
            message: "Password cannot contain empty spaces"
        },
        uppercase: {
            key: 404,
            code: 400,
            type: "request/password/uppercase",
            message: "Password must contain at least one uppercase letter"
        },
        lowercase: {
            key: 405,
            code: 400,
            type: "request/password/lowercase",
            message: "Password must contain at least one lowercase letter"
        },
        number: {
            key: 406,
            code: 400,
            type: "request/password/number",
            message: "Password must contain at least one number"
        },
        special: {
            key: 407,
            code: 400,
            type: "request/password/special",
            message: "Password must contain at least one special character"
        },
        hashed: {
            key: 408,
            code: 400,
            type: "request/password/encryption",
            message: "Failed to encrypt the password"
        },
        nomatch: {
            key: 409,
            code: 400,
            type: "request/password/no-match",
            message: "Password does not match with the email"
        },
        oldpassword: {
            key: 410,
            code: 400,
            type: "request/oldPassword/empty",
            message: "Old password is empty"
        },
        nomatchold: {
            key: 411,
            code: 400,
            type: "request/oldPassword/no-match",
            message: "Old password does not match with the account"
        },
    },
    authValues: {
        empty: {
            key: 501,
            code: 400,
            type: "request/auth-values/empty",
            message: "Unable to find required authentication values"
        },
        missing: {
            key: 502,
            code: 400,
            type: "request/auth-values/missing",
            message: "Unable to find some authentication values"
        },
        gender: {
            key: 503,
            code: 400,
            type: "request/gender/out-of-bound",
            message: "Gender is not one of male, female, none or null"
        },
        birthday: {
            key: 504,
            code: 400,
            type: "request/birthday/invalid",
            message: "Birthday is an invalid Date"
        },
        removesession: {
            key: 505,
            code: 400,
            type: "request/session/invalid-session",
            message: "Cannot remove current session"
        },
    },
    auth: {
        error: {
            key: 601,
            code: 400,
            type: "auth/error/unknown",
            message: "An unknown error occurred",
        },
        exists: {
            key: 602,
            code: 400,
            type: "auth/username/exist",
            message: "A user with this email already exists",
        },
        nouser: {
            key: 603,
            code: 400,
            type: "auth/username/no-user",
            message: "No user with this email exists",
        },
        nolookup: {
            key: 604,
            code: 400,
            type: "auth/username/no-lookup",
            message: "No user with this auth key exists",
        },
        emptylookup: {
            key: 605,
            code: 400,
            type: "auth/username/empty-lookup",
            message: "No users exists",
        },
        session: {
            key: 606,
            code: 400,
            type: "auth/user/no-session",
            message: "No session token was received",
        },
        expired: {
            key: 607,
            code: 400,
            type: "auth/user/no-session",
            message: "User session doesn't exist or has been expired",
        },
    },
};




export default errors;