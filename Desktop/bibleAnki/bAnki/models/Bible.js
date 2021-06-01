const mongoose = require("mongoose");

const BibleSchema = new mongoose.Schema({
    bibleId: {
        type: String,
        required: true,
    },
    bibleName: {
        type: String,
        required: true,
    },
    bibleAbbreviation: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Bible", BibleSchema);
