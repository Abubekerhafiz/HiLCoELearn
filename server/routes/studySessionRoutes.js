const express = require("express");

const router = express.Router();

const {
    createStudySession,
    getStudySessions
} = require("../controllers/studySessionController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createStudySession);

router.get("/", protect, getStudySessions);

module.exports = router;