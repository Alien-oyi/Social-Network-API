const {Thought,User} = require("../models")

const thoughtController = {
    getAllThought({params},res) {
        Thought.find({})
        .populate({
            path:"reactions",
            select:"-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then((dbThoughtDate) =>
        res.json(dbThoughtDate))
        .catch((err) => {
        throw err})
    },
    getThoughtById({params},res) {
        Thought.findOne({_id:params.id})
        .populate({
            path:"reactions",
            select:"-__v"
        })
        .select("-__v")
        .then((dbThoughtDate) => {
            if (!dbThoughtDate) {
                res.status(404).json({message:"Thought not exist"})
            }
            res.json(dbThoughtDate)
    })
    .catch((err) => {
        throw err})
    },
    createThought({params,body},res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(                
                {_id: params.Id},
                {$push:{thoughts:_id}},
                {new:true}
            )})
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({message:"User not exist"})
                }
                res.json({message:"Thought created"})
            })
            .catch((err) => {
                throw err})
    },
    updateThought({params,body},res) {
        Thought.findOneAndUpdate({_id:params.id},body,{
            new:true,
            runValidators:true
        })
        .then((dbThoughtDate) => {
            if (!dbThoughtDate) {
                res.status(404).json({message:"Thought not exist"})
            }
            res.json(dbThoughtDate)
        })
        .catch((err) => {
            throw err})
    }
    }

module.exports = thoughtController;