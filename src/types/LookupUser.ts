interface LookupUser {
    uid: string;
    email: string;
    username: string;

    phone?: string;
    gender?: string;
    profile?: string;
    lastname?: string;
    firstname?: string;
    createdAt?: Date;
}

export default LookupUser;