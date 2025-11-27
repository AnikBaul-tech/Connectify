const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const storyRoutes = require("./routes/story.routes")
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server created");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/story",storyRoutes)

module.exports = app;
