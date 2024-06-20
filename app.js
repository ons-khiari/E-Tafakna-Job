const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5050;
const app = express();
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const skillsRoutes = require("./routes/skills.routes");
const profileRatingRoutes = require("./routes/profileRating.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
const socialRoutes = require("./routes/social.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/profile-rating", profileRatingRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/social", socialRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
