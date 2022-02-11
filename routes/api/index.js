const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./comment-routes");



router.use('/thoughts', commentRoutes);
router.use('/users', userRoutes);