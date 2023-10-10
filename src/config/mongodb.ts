import mongoose, { ConnectOptions } from "mongoose";
import mongo from "../mongodb";
import console from "../tools/console";

mongoose
    .connect(mongo.connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => console.log("MongoDB is connected successfully."))
    .catch((err) => console.error(err));