
export const mongoConnectionURL: string = process.env.MONGODB_CONNECTION_URL as string;

const mongo = {
    connectionURL: mongoConnectionURL
};

export default mongo;