const nhd = require("../services/nhdService");

exports.movie = (req, res) => {
  const url =
    nhd.movieUrl(req.params.id);

  res.json({
    type: "movie",
    streamUrl: url
  });
};

exports.tv = (req, res) => {
  const {
    id,
    season,
    episode
  } = req.params;

  const url =
    nhd.tvUrl(
      id,
      season,
      episode
    );

  res.json({
    type: "tv",
    streamUrl: url
  });
};