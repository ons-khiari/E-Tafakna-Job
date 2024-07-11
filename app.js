const express = require("express");
require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT || 5050;
const app = express();
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const skillsRoutes = require("./routes/skills.routes");
const profileRatingRoutes = require("./routes/profileRating.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
const socialRoutes = require("./routes/social.routes");
const jobRoutes = require("./routes/job.routes");
const proposalRoutes = require("./routes/proposal.routes");
const projectRoutes = require("./routes/project.routes");
const categoryProjectRoutes = require("./routes/categoryProject.routes");
const uploadImage = require("./helpers/uploadImage");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/profile-rating", profileRatingRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/category-project", categoryProjectRoutes);
app.use("/api/image", uploadImage);

app.listen(port, () => console.log(`Listening on port ${port}`));
