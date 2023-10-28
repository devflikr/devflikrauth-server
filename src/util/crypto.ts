import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

const defaultKey = (process.env.CRYPTO_SECRET_KEY as string) || "devflikr";

export function encryptString(inputString: string, secretKey: string = defaultKey) {
    return AES.encrypt(inputString, secretKey).toString();
}

export function decryptString(encryptedString: string, secretKey: string = defaultKey) {

    const decrypted = AES.decrypt(encryptedString, secretKey);
    if (decrypted) {
        try {
            const str = decrypted.toString(encUtf8);
            if (str.length > 0) return str;
        } catch (e) { return ""; }
    }
    return "";
}
