const router = require("express").Router();
const {
    getAllThoughts,
    createThought,
    getOneThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
  } = require("../../controllers/thought-controller");


// /api/thoughts/<userId>
router
.route("/")
.get(getAllThoughts)

// /api/thoughts/<userId>
router
.route("/:userId")
.post(createThought)

// /api/thoughts/<thoughtId>
router.route("/:thoughtId")
.get(getOneThought)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router
.route("/:thoughtId/reactions")
.post(addReaction)

// /api/thoughts/:thoughtId/reactions/reactionId
router
.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction)



module.exports = router;