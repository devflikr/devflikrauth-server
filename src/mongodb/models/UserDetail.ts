import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userDetailSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        unique: true,
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: String,
    profile: String,
    username: {
        type: String,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
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
});

const UserDetail = mongoose.model("userdetail", userDetailSchema);

export default UserDetail;