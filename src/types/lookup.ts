export default interface Lookup {
    uid: string;
    name?: string;
    email?: string;
    phone?: string;
    profile?: string;
    username?: string;
    isVerified?: boolean;
    deviceToken: string;
    sessionToken: string;
}