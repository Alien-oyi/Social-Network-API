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
    }
}

module.exports = thoughtController;