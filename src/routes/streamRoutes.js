const router = require("express").Router();

const stream =
  require("../controllers/streamController");

router.get(
  "/movie/:id",
  stream.movie
);

router.get(
  "/tv/:id/:season/:episode",
  stream.tv
);

module.exports = router;