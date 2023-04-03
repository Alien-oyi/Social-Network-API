const { getAllThought,getThoughtById,createThought,updateThought,deleteThought,addReaction } = require("../../controllers/thoughtController");

const router = require("express").Router()

router.route("/").get(getAllThought).post(createThought)

router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(addReaction)


module.exports = router;