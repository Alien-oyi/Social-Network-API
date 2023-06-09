const {Schema,model,Types} = require("mongoose")
const {format_date} = require("../utils/helpers")

const ReactionSchema = new Schema(
    {
        reactionId:{
            // ObjectId data type
            type:Schema.Types.ObjectId,
            default:() =>new Types.ObjectId()
        },
        reactionContent:{
            type:String,
            required:true,
            min:1
        },
        username:{
            type:String,
            required:true
        },
        created_at:{
            type:Date,
            default:Date.now,
            get:(timestamp) =>format_date(timestamp)
        }
    },{
        toJSON:{
            getters:true,
        },
        id:false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            min:1
        },
        created_at:{
            type:Date,
            default:Date.now,
            get:(timestamp)=>format_date(timestamp)
        },
        username:{
            type:String,
            required:true
        },
        reactions:[ReactionSchema],      
        },{
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
)


ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length
})

const Thought = model("Thought",ThoughtSchema);

module.exports = Thought;
