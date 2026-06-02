const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const tvRoutes = require("./routes/tvRoutes");
const animeRoutes = require("./routes/animeRoutes");
const searchRoutes = require("./routes/searchRoutes");
const streamRoutes = require("./routes/streamRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "HyperFlix API",
    status: "Running"
  });
});

app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/home", homeRoutes);

module.exports = app;