const PLAYER_OPTIONS =
  "?title=true" +
  "&nextbutton=true"+
  "&player=jw"+
  "&secondaryColor=#ff0000"+
  "&primaryColor=#ff0000"+
  "&iconColor=#eefdec";

exports.movieUrl = (tmdbId) => {
  return `https://vidlink.pro/movie/${tmdbId}${PLAYER_OPTIONS}`;
};

exports.tvUrl = (tmdbId, season, episode) => {
  return `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}${PLAYER_OPTIONS}`;
};