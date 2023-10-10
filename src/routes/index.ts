import express from 'express';
import checkEmail from '../verify/checkEmail';
import checkPassword from '../verify/checkPassword';
import controllerLogin from '../controller/login';
import controllerRegister from '../controller/register';
import checkUsernameOrEmail from '../verify/checkUsernameOrEmail';
import controllerUsernameToEmail from '../controller/login/usernameToEmail';
import controllerCreateUserToken from '../controller/token';

import { validateAuthValues } from '../util/authValues';
import controllerUpdateAuthArray from '../controller/token/updateAuthArray';
import controllerLookup from '../controller/lookup';
import controllerLookupAuthSetter from '../controller/lookup/authSetter';
import controllerLookupCustomPath from '../controller/lookup/customPath';

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
    controllerLookupCustomPath,
    controllerLookupAuthSetter,
    controllerLookup, // return all active user sessions
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

export default accountsRouter;