const tmdb = require("../config/tmdb");

exports.getTrending = async (req, res) => {
  const response =
    await tmdb.get("/trending/tv/day");

  res.json(response.data.results);
};

exports.getPopular = async (req, res) => {
  const response =
    await tmdb.get("/tv/popular");

  res.json(response.data.results);
};

exports.getDetails = async (req, res) => {
  const response =
    await tmdb.get(`/tv/${req.params.id}`);

  res.json(response.data);
};

exports.getSeason = async (req, res) => {
  const { id, season } = req.params;

  const response =
    await tmdb.get(
      `/tv/${id}/season/${season}`
    );

  res.json(response.data);
};