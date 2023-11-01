import { encryptString } from "./crypto";
import getRandomColorWithContrast from "./color";

export default function generateUserUniqueProfilePicture(name: string) {
    const { color, contrast } = getRandomColorWithContrast();

    let initials = name;

    if (initials.includes("-")) initials = initials.split("-").filter(word => !!word).join(" ");

    initials = ((initials.split(" ").length > 1) ? initials.split(" ").map(word => word.charAt(0)).join("") : initials).slice(0, 2).toUpperCase();

    return `http://localhost:${process.env.PORT}/userprofile/u/${encodeURIComponent(encryptString(`${initials}:${color}:${contrast}`))}`;
}