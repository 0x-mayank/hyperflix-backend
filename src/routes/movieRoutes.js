const router = require("express").Router();

const movie =
  require("../controllers/movieController");

router.get(
  "/trending",
  movie.getTrending
);

router.get(
  "/popular",
  movie.getPopular
);

router.get(
  "/top-rated",
  movie.getTopRated
);

router.get(
  "/upcoming",
  movie.getUpcoming
);

router.get(
  "/:id",
  movie.getDetails
);

module.exports = router;