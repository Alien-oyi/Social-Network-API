const {User, Thought} = require("../models")

const userController = {
  // get all users
  getUser(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
    createUser({body}, res) {
      User.create(body)       
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
    }}

  module.exports = userController;