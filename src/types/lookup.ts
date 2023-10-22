interface Lookup {
    uid: string;
    index: number;
    email?: string;
    phone?: string;
    profile?: string;
    lastname?: string;
    username?: string;
    firstname?: string;
    deviceToken: string;
    isVerified?: boolean;
    sessionToken: string;
}

export default Lookup;