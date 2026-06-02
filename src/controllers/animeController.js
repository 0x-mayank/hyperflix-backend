const tmdb = require("../config/tmdb");

exports.getTrending = async (req, res) => {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        with_genres: 16,
        sort_by: "popularity.desc"
      }
    }
  );

  res.json(response.data.results);
};

exports.getPopular = async (req, res) => {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        with_genres: 16,
        sort_by: "vote_count.desc"
      }
    }
  );

  res.json(response.data.results);
};

exports.getTopRated = async (req, res) => {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        with_genres: 16,
        sort_by: "vote_average.desc",
        vote_count_gte: 100
      }
    }
  );

  res.json(response.data.results);
};

exports.getDetails = async (req, res) => {
  const response =
    await tmdb.get(`/tv/${req.params.id}`);

  res.json(response.data);
};