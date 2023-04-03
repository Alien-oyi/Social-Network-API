const router = require("express").Router()
const {getUser,createUser,getUserById,updateUser,deleteUser,addFriend} = require("../../controllers/userController")

// api/users
router.route("/").get(getUser).post(createUser)
// api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend)
module.exports = router;