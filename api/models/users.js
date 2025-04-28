const mongoose = require("mongoose");

const flowChartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nodes: {
        type: Array,
        default: [],
    },
    edges: {
        type: Array,
        default: [],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
});

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
    name: {
        type: String,
        required: true,
    },
    flowCharts: {
        type: [flowChartSchema],
        default: [],
    }
});



module.exports = mongoose.model("users", dataSchema);
