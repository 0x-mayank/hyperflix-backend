const PLAYER_OPTIONS =
  "?title=true" +
  "&nextbutton=true"+
  "&player=jw"+
  "&secondaryColor=170000"+
  "&primaryColor=B20710";

exports.movieUrl = (tmdbId) => {
  return `https://vidlink.pro/movie/${tmdbId}${PLAYER_OPTIONS}`;
};

exports.tvUrl = (tmdbId, season, episode) => {
  return `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}${PLAYER_OPTIONS}`;
};