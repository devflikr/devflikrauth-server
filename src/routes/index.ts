import express from "express";

import checkName from "../verify/checkName";
import checkEmail from "../verify/checkEmail";
import checkPhone from "../verify/checkPhone";
import checkProfile from "../verify/checkProfile";
import checkSession from "../verify/checkSession";
import checkUsername from "../verify/checkUsername";
import checkPassword from "../verify/checkPassword";
import checkUsernameOrEmail from "../verify/checkUsernameOrEmail";

import { validateAuthValues } from "../util/authValues";

import controllerLogin from "../controller/login";
import controllerUsernameToEmail from "../controller/login/usernameToEmail";

import controllerRegister from "../controller/register";

import controllerCreateUserToken from "../controller/token";
import controllerSessionToUserID from "../controller/token/sessionToUid";
import controllerUpdateAuthArray from "../controller/token/updateAuthArray";

import controllerLookup from "../controller/lookup";
import controllerLookupOne from "../controller/lookup/lookupOne";
import controllerLookupAuthSetter from "../controller/lookup/authSetter";

import controllerLogout from "../controller/logout";

import controllerUsername from "../controller/username";

import controllerProfile from "../controller/profile";
import controllerProfilePicture, { controllerProfilePictureEncrypted } from "../controller/profile/profilepicture";
import checkBirthDay from "../verify/checkBirthday";
import checkGender from "../verify/checkGender";

const accountsRouter = express.Router();

accountsRouter.post(
    "/createuser",
    checkEmail,
    checkPassword,
    validateAuthValues(["email", "password"]),
    controllerRegister,
    controllerCreateUserToken,
    controllerUpdateAuthArray,
    controllerLookup,
);

accountsRouter.get(
    "/lookup",
    controllerLookupAuthSetter,
    controllerLookup,
);
accountsRouter.get(
    "/lookup/:authID",
    controllerLookupAuthSetter,
    controllerLookupOne,
);

accountsRouter.delete(
    "/removesessions",
    controllerLookupAuthSetter,
    controllerLogout,
);

accountsRouter.post(
    "/updateprofile",
    checkSession,
    checkName,
    checkProfile,
    checkPhone,
    checkBirthDay,
    checkGender,
    controllerSessionToUserID,
    controllerProfile,
    controllerLookupAuthSetter,
    controllerLookup,
);

accountsRouter.get(
    "/userprofile/n/:name",
    controllerProfilePicture,
);
accountsRouter.get(
    "/userprofile/u/:encrypt",
    controllerProfilePictureEncrypted,
);

accountsRouter.post(
    "/updateusername",
    checkSession,
    checkUsername,
    controllerSessionToUserID,
    controllerUsername,
    controllerLookupAuthSetter,
    controllerLookup,
);

accountsRouter.post(
    "/adduser",
    checkUsernameOrEmail,
    checkPassword,
    controllerUsernameToEmail,
    validateAuthValues(["email", "password"]),
    controllerLogin,
    controllerCreateUserToken,
    controllerUpdateAuthArray,
    controllerLookup,
);


// pwdnew [session: user session token, "old-password": old password, "new-password": new password]
// pwdreset [email: user email]

// verifyuser [email: user email]
// getsessions [session: code]
// removesessions [session: code, remove: code]
// getuserdetail [type: "email" | "uid" | "username", find: string]




export default accountsRouter;