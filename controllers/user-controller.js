const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  //get one user
  getOneUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json({ message: "No user associated with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log("error", err);
        res.json(err);
      });
  },
  // update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json({ message: "No user associated with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json({ message: "No user associated with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: `No User found with this id!` });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  // delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.json({ message: "No User asscoiated with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};

module.exports = userController;
