const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdVal) => dateFormat(createdVal),
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdVal) => dateFormat(createdVal),
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

Thought.virtual("reactionCount", function(){
    return this.reactions.length;
})


const Thought = model("Thought", ThoughtSchema);