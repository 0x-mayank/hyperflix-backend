const tmdb = require("../config/tmdb");

exports.getHomeData = async (req, res) => {
  try {
    const [
      trendingMovies,
      popularMovies,
      trendingTV,
      popularTV,
      trendingAnime,
    ] = await Promise.all([
      tmdb.get("/trending/movie/week"),
      tmdb.get("/movie/popular"),
      tmdb.get("/trending/tv/week"),
      tmdb.get("/tv/popular"),
      tmdb.get("/discover/tv", {
        params: {
          with_genres: 16,
          with_origin_country: "JP",
          sort_by: "popularity.desc",
        },
      }),
    ]);

    res.json({
      trendingMovies: trendingMovies.data.results,
      popularMovies: popularMovies.data.results,
      trendingTV: trendingTV.data.results,
      popularTV: popularTV.data.results,
      trendingAnime: trendingAnime.data.results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch home data",
    });
  }
};