import mongoose from "mongoose";

const userEntrySchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const UserEntry = mongoose.model("userentry", userEntrySchema);

export default UserEntry;