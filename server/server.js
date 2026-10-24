const express = require("express");
console.log("THIS IS MY STUDYBUDDY SERVER");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("StudyBuddy API is running");
});
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});
app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/study-sessions", studySessionRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});