import throwError from "../../tools/error";
import { decryptString } from "../../util/crypto";
import getRandomColorWithContrast from "../../util/color";
import { generateUniqueUsername } from "../../util/generator";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function controllerProfilePicture(req: ExpressRequest, res: ExpressResponse) {

    let initials = req.params["name"] || generateUniqueUsername();

    if (initials.includes("-")) initials = initials.split("-").filter(word => !!word).join(" ");

    initials = ((initials.split(" ").length > 1) ? initials.split(" ").map(word => word.charAt(0)).join("") : initials).slice(0, 2).toUpperCase();

    const { color, contrast } = getRandomColorWithContrast();

    return profile(res, initials, color, contrast);
}

export default controllerProfilePicture;

function profile(res: ExpressResponse, initials: string, color: string, contrast: string) {
    const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                <rect x="0" y="0" width="512" height="512" fill="${color}" />
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="200" style="font-family: 'Nunito', sans-serif; font-weight: 600;" fill="${contrast}">${initials}</text>
            </svg>
        `;

    res.set("Content-Type", "image/svg+xml");
    res.set("Cache-Control", "no-cache");

    res.send(svgContent);
}


export async function controllerProfilePictureEncrypted(req: ExpressRequest, res: ExpressResponse) {

    const encryptedString = decodeURIComponent(req.params["encrypt"] as string);

    if (!encryptedString) return throwError(res, 601);

    const decryptedArray = decryptString(encryptedString).split(":");

    if (decryptedArray.length !== 3) return throwError(res, 601);

    return profile(res, decryptedArray[0], decryptedArray[1], decryptedArray[2]);
}