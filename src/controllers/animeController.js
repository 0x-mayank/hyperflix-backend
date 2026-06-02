const tmdb = require("../config/tmdb");

const animeParams = {
  with_genres: 16,              
  with_original_language: "ja",
  "vote_count.gte": 100,        
  watch_region: "JP"            
};

const filterAnime = (results) => {
  return results.filter((item) => item.original_language === "ja");
};

exports.getTrending = async (req, res) => {
  const response = await tmdb.get("/discover/tv", {
    params: {
      ...animeParams,
      sort_by: "popularity.desc"
    }
  });
  res.json(filterAnime(response.data.results));
};

exports.getPopular = async (req, res) => {
  const response = await tmdb.get("/discover/tv", {
    params: {
      ...animeParams,
      sort_by: "vote_count.desc" 
    }
  });
  res.json(filterAnime(response.data.results));
};

exports.getTopRated = async (req, res) => {
  const response = await tmdb.get("/discover/tv", {
    params: {
      ...animeParams,
      sort_by: "vote_average.desc",
      "vote_count.gte": 500 
    }
  });
  res.json(filterAnime(response.data.results));
};

exports.getDetails = async (req, res) => {
  const response = await tmdb.get(`/tv/${req.params.id}`);
  res.json(response.data);
};