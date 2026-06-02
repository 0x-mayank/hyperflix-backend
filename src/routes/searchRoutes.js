const router = require("express").Router();

const search =
  require("../controllers/searchController");

router.get(
  "/",
  search.search
);

module.exports = router;