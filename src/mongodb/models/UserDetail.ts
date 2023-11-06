import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    gender: {
        type: String,
        default: "null",
    },
    profile: String,
    birthday: Date,
    lastname: String,
    firstname: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    passwordUpdatedAt: Date,
});

const UserDetail = mongoose.model("userdetail", userDetailSchema);

export default UserDetail;