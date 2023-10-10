import { uniqueNamesGenerator, adjectives, animals, colors, countries, names, languages } from "unique-names-generator";

export function generateUniqueUsername() {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors, countries, names, languages],
        length: 3,
        style: "capital",
        separator: "-",
    }).replace(" /gm", "-") + "-" + generateRandomString(8, 5);
}

export function generateRandomString(length: number = 4, pattern: 1 | 2 | 3 | 4 | 5 = 3) {
    const characterSet =
        (pattern === 1) ? "abcdefghijklmnopqrstuvwxyz"
            : (pattern === 2) ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                : (pattern === 3) ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                    : (pattern === 4) ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@!_-?.,"
                        : (pattern === 5) ? "abcdef0123456789" : "";

    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        result += characterSet.charAt(randomIndex);
    }

    return result;
}