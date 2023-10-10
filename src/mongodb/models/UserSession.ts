import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true,
    },
    device: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expiredAt: {
        type: Date,
    },
});

const UserSession = mongoose.model("usersession", userSessionSchema);

export default UserSession;