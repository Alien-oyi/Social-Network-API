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
  },
  // get one user by id
  getUserById({params},res) {
    User.findOne({_id:params.id})
    // populate is mysql reference
    .populate({
      path:"thoughts",
      select:"-__v"
    })
    .populate({
      path:"friends",
      select:"-__v"
    })
    .select("-__v")
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({message:"User not exist"})
    } 
     res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Fail to find the user")
    })    
    },
    updateUser({params,body}, res) {
      User.findOneAndUpdate({_id:params.id},body,{
        new:true,
        runValidators:true
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({message:"User not exist"})
        }
        res.json(dbUserData);
      })
     .catch((err) => {
      throw err;
      })
    },
    deleteUser({params},res) {
      User.findOneAndDelete({_id:params.id})
      .then((dbUserData) =>{
        if (!dbUserData) {
          res.status(404).json({message:"User not found"})
        }
        res.json({message:"User has been deleted"})
      })
    }
    }

module.exports = userController;