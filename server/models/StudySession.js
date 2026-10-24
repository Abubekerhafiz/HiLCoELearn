const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
            trim: true
        },

        topic: {
            type: String,
            required: true,
            trim: true
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        date: {
            type: Date,
            required: true
        },

        completed: {
            type: Boolean,
            default: false
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const StudySession = mongoose.model(
    "StudySession",
    studySessionSchema
);

module.exports = StudySession;