const { getAllThought } = require("../../controllers/thoughtController");

const router = require("express").Router()

router.route("/").get(getAllThought)


module.exports = router;