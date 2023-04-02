const { getAllThought,getThoughtById,createThought } = require("../../controllers/thoughtController");

const router = require("express").Router()

router.route("/").get(getAllThought).post(createThought)

router.route("/:id").get(getThoughtById)


module.exports = router;