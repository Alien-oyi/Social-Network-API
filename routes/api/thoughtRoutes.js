const { getAllThought,getThoughtById,createThought,updateThought,deleteThought } = require("../../controllers/thoughtController");

const router = require("express").Router()

router.route("/").get(getAllThought).post(createThought)

router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought)


module.exports = router;