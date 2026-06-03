const router = require("express").Router();
const anime = require("../controllers/animeController");

router.get("/trending", anime.getTrending);
router.get("/popular", anime.getPopular);
router.get("/top-rated", anime.getTopRated);
router.get("/:id", anime.getDetails);

module.exports = router;