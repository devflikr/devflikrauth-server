import mongoose from 'mongoose';

const userNameSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
});

const UserName = mongoose.model("username", userNameSchema);

export default UserName;