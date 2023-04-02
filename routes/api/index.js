const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes")


router.use("/users", userRoutes);
router.use("/thought", thoughtRoutes)

module.exports = router;