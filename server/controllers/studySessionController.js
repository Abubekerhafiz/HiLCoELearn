const StudySession = require("../models/StudySession");

// Create a study session
const createStudySession = async (req, res) => {
    try {
        const { subject, topic, duration, date } = req.body;

        if (!subject || !topic || !duration || !date) {
            return res.status(400).json({
                message: "Please provide subject, topic, duration and date"
            });
        }

        const studySession = await StudySession.create({
            subject,
            topic,
            duration,
            date,
            user: req.user.id
        });

        res.status(201).json({
            message: "Study session created successfully",
            studySession
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get all study sessions belonging to logged-in user
const getStudySessions = async (req, res) => {
    try {
        const studySessions = await StudySession.find({
            user: req.user.id
        }).sort({ date: -1 });

        res.status(200).json({
            studySessions
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createStudySession,
    getStudySessions
};
