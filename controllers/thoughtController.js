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
                {_id: body.userId},
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
    },
    deleteThought({params},res) {
        Thought.findOneAndDelete({_id:params.id})
        .then((dbThoughtDate) => {
            if (!dbThoughtDate) {
                res.status(404).json({message:"Thought not exist"})
            }
            return User.findOneAndUpdate(
                {_id:dbThoughtDate.userId},
                {$pull:{thoughts:params.id}},
                {new:true}
            )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({message:"User not exist"})
                }
                res.json({message:"Thought deleted"})
            })
           .catch((err) => {
            throw err})
    },
    addReaction({params,body},res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$push:{reactions:body}},
            {new:true,runValidators:true}
        )
        .then((dbThoughtDate) => {
            if (!dbThoughtDate) {
                res.status(404).json({message:"Thought not exist"})
            }
            res.json(dbThoughtDate)
        })
        .catch((err) => {
            throw err})
    },
    deleteReaction({params},res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull:{reactions:{reactionId:params.reactionId}}},
            {new:true}
        )
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