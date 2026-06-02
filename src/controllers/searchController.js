const tmdb = require("../config/tmdb");

exports.search = async (req, res) => {
  const { q } = req.query;

  const response =
    await tmdb.get("/search/multi", {
      params: {
        query: q
      }
    });

  res.json(response.data.results);
};