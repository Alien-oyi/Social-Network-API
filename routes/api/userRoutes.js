const router = require("express").Router()
const {getUser,createUser} = require("../../controllers/userController")

// api/users
router.route("/").get(getUser).post(createUser)

module.exports = router;