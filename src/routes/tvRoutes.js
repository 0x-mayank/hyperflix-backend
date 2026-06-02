const router = require("express").Router();

const tv =
  require("../controllers/tvController");

router.get(
  "/trending",
  tv.getTrending
);

router.get(
  "/popular",
  tv.getPopular
);

router.get(
  "/:id/season/:season",
  tv.getSeason
);

router.get(
  "/:id",
  tv.getDetails
);

module.exports = router;