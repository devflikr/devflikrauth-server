import express from "express";
import checkEmail from "../verify/checkEmail";
import checkPassword from "../verify/checkPassword";
import controllerLogin from "../controller/login";
import controllerRegister from "../controller/register";
import checkUsernameOrEmail from "../verify/checkUsernameOrEmail";
import controllerUsernameToEmail from "../controller/login/usernameToEmail";
import controllerCreateUserToken from "../controller/token";

import { validateAuthValues } from "../util/authValues";
import controllerUpdateAuthArray from "../controller/token/updateAuthArray";
import controllerLookup from "../controller/lookup";
import controllerLookupAuthSetter from "../controller/lookup/authSetter";
import controllerLogout from "../controller/logout";
import controllerLookupOne from "../controller/lookup/lookupOne";
import checkName from "../verify/checkName";
import checkProfile from "../verify/checkProfile";
import checkPhone from "../verify/checkPhone";
import controllerProfile from "../controller/profile";
import controllerSessionToUserID from "../controller/token/sessionToUid";
import checkSession from "../verify/checkSession";
import controllerProfilePicture, { controllerProfilePictureEncrypted } from "../controller/profile/profilepicture";
import checkUsername from "../verify/checkUsername";
import controllerUsername from "../controller/username";

const accountsRouter = express.Router();

accountsRouter.post(
    "/createuser", // path
    checkEmail, // validate email address
    checkPassword, // validate password
    validateAuthValues(["email", "password"]), // check if email and password token is present
    controllerRegister, // create user-entry, user-name, user-data documents
    controllerCreateUserToken, // create a user session token
    controllerUpdateAuthArray, // add session to the auth array
    controllerLookup, // return all active user sessions
);

accountsRouter.get(
    "/lookup",
    controllerLookupAuthSetter,
    controllerLookup, // return all active user sessions
);
accountsRouter.get(
    "/lookup/:authID",
    controllerLookupAuthSetter,
    controllerLookupOne, // return all active user sessions
);

accountsRouter.delete(
    "/removesessions",
    controllerLookupAuthSetter,
    controllerLogout, // return all active user sessions
);

accountsRouter.post(
    "/updateprofile",
    checkSession,
    checkName,
    checkProfile,
    checkPhone,
    controllerSessionToUserID,
    controllerProfile,
    controllerLookupAuthSetter,
    controllerLookup,
);

accountsRouter.get(
    "/userprofile/:name",
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
    "/adduser", // path
    checkUsernameOrEmail, // validate username or email address
    checkPassword, // validate password
    controllerUsernameToEmail, // if username was used find the attached email
    validateAuthValues(["email", "password"]), // check if email and password token is present
    controllerLogin, // check for password validation with hashed password
    controllerCreateUserToken, // create a user session token
    controllerUpdateAuthArray, // add session to the auth array
    controllerLookup, // return all active user sessions
);

// accountsRouter.post("/pwdnew");
// accountsRouter.post("/pwdsend");
// accountsRouter.post("/pwdtoken");

export default accountsRouter;