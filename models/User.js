const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
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
          ref: "User"
      }
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

const User = model("User", UserSchema);