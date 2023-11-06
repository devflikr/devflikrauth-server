interface Lookup {
    uid: string;
    index: number;
    email: string;
    username: string;
    deviceToken: string;
    sessionToken: string;

    phone?: string;
    gender?: string;
    profile?: string;
    birthday?: Date;
    lastname?: string;
    firstname?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isVerified?: boolean;
    passwordUpdatedAt?: Date;
}

export default Lookup;