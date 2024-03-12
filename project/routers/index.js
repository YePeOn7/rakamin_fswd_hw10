const router = require("express").Router();
const moviesRouter = require("./movies.router.js");
const usersRouter = require("./users.roter.js");

router.use("/api/movies/", moviesRouter);
router.use("/api/users", usersRouter);

module.exports = router;
