const axios = require("axios");
const tmdb = require("../config/tmdb");

const animeParams = {
  with_genres: 16,
  with_original_language: "ja",
  "vote_count.gte": 100,
  watch_region: "JP",
};

const filterAnime = (results) => {
  return results.filter((item) => item.original_language === "ja");
};

const getAnilistId = async (title) => {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        title { romaji english }
      }
    }
  `;
  const response = await axios.post(
    "https://graphql.anilist.co",
    { query, variables: { search: title } },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.data.Media.id;
};

exports.getTrending = async (req, res) => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: { ...animeParams, sort_by: "popularity.desc" },
    });
    res.json(filterAnime(response.data.results));
  } catch (error) {
    console.error("getTrending error:", error.message);
    res.status(500).json({ error: "Failed to fetch trending anime" });
  }
};

exports.getPopular = async (req, res) => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: { ...animeParams, sort_by: "vote_count.desc" },
    });
    res.json(filterAnime(response.data.results));
  } catch (error) {
    console.error("getPopular error:", error.message);
    res.status(500).json({ error: "Failed to fetch popular anime" });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: {
        ...animeParams,
        sort_by: "vote_average.desc",
        "vote_count.gte": 500,
      },
    });
    res.json(filterAnime(response.data.results));
  } catch (error) {
    console.error("getTopRated error:", error.message);
    res.status(500).json({ error: "Failed to fetch top rated anime" });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const response = await tmdb.get(`/tv/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    console.error("getDetails error:", error.message);
    res.status(500).json({ error: "Failed to fetch anime details" });
  }
};

exports.getStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { episode = 1 } = req.query;

    // Step 1: get anime title from TMDB
    const tmdbRes = await tmdb.get(`/tv/${id}`);
    const title = tmdbRes.data.original_name || tmdbRes.data.name;

    // Step 2: get AniList ID from title
    const anilistId = await getAnilistId(title);

    // Step 3: build Megaplay embed URL
    const streamUrl = `https://megaplay.buzz/stream/ani/${anilistId}/${episode}/sub`;

    res.json({ streamUrl, anilistId });
  } catch (error) {
    console.error("getStream error:", error.message);
    res.status(500).json({ error: "Failed to get anime stream" });
  }
};