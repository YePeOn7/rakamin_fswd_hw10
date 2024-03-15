const express = require('express');
const router = require("express").Router();
const moviesRouter = require("./movies.router.js");
const usersRouter = require("./users.roter.js");
const path = require('path');

router.use("/api/images", express.static(path.join(__dirname, "../uploads")))
router.use("/api/movies", moviesRouter);
router.use("/api/users", usersRouter);

module.exports = router;