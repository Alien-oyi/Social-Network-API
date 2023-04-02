const { getAllThought,getThoughtById,createThought,updateThought } = require("../../controllers/thoughtController");

const router = require("express").Router()

router.route("/").get(getAllThought).post(createThought)

router.route("/:id").get(getThoughtById).put(updateThought)


module.exports = router;