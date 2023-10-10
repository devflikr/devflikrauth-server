import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userDeviceSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    device: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    connectedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const UserDevice = mongoose.model("userdevice", userDeviceSchema);

export default UserDevice;