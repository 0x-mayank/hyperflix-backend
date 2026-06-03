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

// Get AniList ID from a title search
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

// Get all seasons (base + sequels) from AniList
const getAnilistSeasons = async (title) => {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        episodes
        title { romaji english }
        relations {
          edges {
            relationType
            node {
              id
              type
              episodes
              seasonYear
              title { romaji english }
            }
          }
        }
      }
    }
  `;
  const response = await axios.post(
    "https://graphql.anilist.co",
    { query, variables: { search: title } },
    { headers: { "Content-Type": "application/json" } }
  );

  const media = response.data.data.Media;

  const sequels = media.relations.edges
    .filter(
      (e) =>
        e.relationType === "SEQUEL" &&
        e.node.type === "ANIME" &&
        e.node.episodes > 0
    )
    .sort((a, b) => (a.node.seasonYear || 0) - (b.node.seasonYear || 0));

  const seasons = [
    {
      season: 1,
      anilistId: media.id,
      episodes: media.episodes || 12,
      title: media.title.english || media.title.romaji,
    },
    ...sequels.map((s, i) => ({
      season: i + 2,
      anilistId: s.node.id,
      episodes: s.node.episodes || 12,
      title: s.node.title.english || s.node.title.romaji,
    })),
  ];

  return seasons;
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

// GET /api/anime/:id/seasons
exports.getSeasons = async (req, res) => {
  try {
    const { id } = req.params;

    const tmdbRes = await tmdb.get(`/tv/${id}`);
    const title = tmdbRes.data.original_name || tmdbRes.data.name;

    const seasons = await getAnilistSeasons(title);

    res.json({ seasons });
  } catch (error) {
    console.error("getSeasons error:", error.message);
    res.status(500).json({ error: "Failed to get anime seasons" });
  }
};

// GET /api/anime/:id/stream?episode=1&anilistId=123
exports.getStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { episode = 1, anilistId } = req.query;

    let resolvedAnilistId = anilistId;

    // If no anilistId passed, fall back to fetching it from title
    if (!resolvedAnilistId) {
      const tmdbRes = await tmdb.get(`/tv/${id}`);
      const title = tmdbRes.data.original_name || tmdbRes.data.name;
      resolvedAnilistId = await getAnilistId(title);
    }

    const streamUrl = `https://megaplay.buzz/stream/ani/${resolvedAnilistId}/${episode}/sub`;

    res.json({ streamUrl, anilistId: resolvedAnilistId });
  } catch (error) {
    console.error("getStream error:", error.message);
    res.status(500).json({ error: "Failed to get anime stream" });
  }
};