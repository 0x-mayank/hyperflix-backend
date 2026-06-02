const tmdb = require("../config/tmdb");

exports.getTrending = async (req, res) => {
  const response = await tmdb.get("/trending/movie/week");

  res.json(response.data.results);
};

exports.getPopular = async (req, res) => {
  const response = await tmdb.get("/movie/popular");

  res.json(response.data.results);
};

exports.getTopRated = async (req, res) => {
  const response = await tmdb.get("/movie/top_rated");

  res.json(response.data.results);
};

exports.getUpcoming = async (req, res) => {
  const response = await tmdb.get("/movie/upcoming");

  res.json(response.data.results);
};

exports.getDetails = async (req, res) => {
  const response = await tmdb.get(
    `/movie/${req.params.id}`
  );

  res.json(response.data);
};