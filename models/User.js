const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
// const validateEmail = require('../utils/validateEmail');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: 'Check your email syntax',
      unique: true,
      match: /^([a-zA-Z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  // Schema options
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // Mongoose not to return the id
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
