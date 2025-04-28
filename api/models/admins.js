const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regular expression to validate email format
    },
    password: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("admins", dataSchema);
