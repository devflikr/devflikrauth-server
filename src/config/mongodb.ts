import mongo from "../mongodb";
import mongoose, { ConnectOptions } from "mongoose";

mongoose
    .connect(mongo.connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => console.log("MongoDB is connected successfully."))
    .catch((err) => console.error(err));