const BASE_URL =
  process.env.PLAYER_BASE_URL;

const PLAYER_OPTIONS = new URLSearchParams({
  title: true,
  poster: true,
  autoPlay: true,
  nextButton: true,
  autoNext: true,
  theme: "16A085",
  hideServer: false,
  fullscreenButton: true,
}).toString();

exports.movieUrl = (tmdbId) =>
  `${BASE_URL}/movie/${tmdbId}?${PLAYER_OPTIONS}`;

exports.tvUrl = (tmdbId, season, episode) =>
  `${BASE_URL}/tv/${tmdbId}/${season}/${episode}?${PLAYER_OPTIONS}`;