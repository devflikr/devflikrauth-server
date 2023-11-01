interface UserSession {
    uid: string,
    createdAt: Date,
    expiredAt: Date,

    current: boolean;
    deviceToken: string;
    sessionToken: string;

    ip: string,
    os: string,
    device: string,
    browser: string,
    platform: string,
    connectedAt: Date,
}

export default UserSession;