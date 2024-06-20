const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5050;
const app = express();
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
