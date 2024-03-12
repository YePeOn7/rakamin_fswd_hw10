const router = require("express").Router();
const moviesRouter = require("./movies.router.js");
// const userRouter = require("./users.roter.js");

router.use("/api/movies/", moviesRouter);

module.exports = router;
