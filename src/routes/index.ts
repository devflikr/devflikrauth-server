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
import { generateUniqueUsername } from "../util/generator";
import getRandomColorWithContrast from "../util/color";
import checkName from "../verify/checkName";
import checkProfile from "../verify/checkProfile";
import checkPhone from "../verify/checkPhone";
import controllerProfile from "../controller/profile";
import controllerProfileSessionToUserID from "../controller/profile/sessionToUid";
import checkSession from "../verify/checkSession";

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
    controllerProfileSessionToUserID,
    controllerProfile,
    controllerLookupAuthSetter,
    controllerLookup,
);

accountsRouter.get(
    "/userprofile/:name",
    (req, res) => {
        let initials = req.params["name"] || generateUniqueUsername();

        if (initials.includes("-")) initials = initials.split("-").filter(word => !!word).join(" ");

        initials = ((initials.split(" ").length > 1) ? initials.split(" ").map(word => word.charAt(0)).join("") : initials).slice(0, 2).toUpperCase();

        const { color, contrast } = getRandomColorWithContrast();
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                <rect x="0" y="0" width="512" height="512" fill="${color}" />
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="160" style="font-family: "Nunito", sans-serif; font-weight: 600;" fill="${contrast}">${initials}</text>
            </svg>
        `;

        res.set("Content-Type", "image/svg+xml");
        res.set("Cache-Control", "no-cache");

        res.send(svgContent);
    },
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