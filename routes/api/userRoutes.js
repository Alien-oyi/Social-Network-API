const router = require("express").Router()
const {getUser,createUser,getUserById} = require("../../controllers/userController")

// api/users
router.route("/").get(getUser).post(createUser)
// api/users/:id
router.route("/:id").get(getUserById)

module.exports = router;