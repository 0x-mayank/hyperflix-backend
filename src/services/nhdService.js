const PLAYER_OPTIONS =
  "?download=true" +
  "&audio=true" +
  "&title=true" +
  "&setting=true";

exports.movieUrl = (id) => {
  return `https://nhdapi.com/embed/movie/${id}${PLAYER_OPTIONS}`;
};

exports.tvUrl = (
  id,
  season,
  episode
) => {
  return `https://nhdapi.com/embed/tv/${id}/${season}/${episode}${PLAYER_OPTIONS}`;
};