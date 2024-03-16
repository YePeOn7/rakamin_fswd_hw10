const express = require('express');
const router = require("express").Router();
const moviesRouter = require("./movies.router.js");
const usersRouter = require("./users.roter.js");
const authRouter = require("./auth.router.js");
const auth = require("../middlewares/auth.js");
const path = require('path');

router.use("/api/auth", authRouter);
router.use(auth.authenticate);
router.use("/api/movies", moviesRouter);
router.use("/api/users", usersRouter);
router.use("/api/images", express.static(path.join(__dirname, "../uploads")))

module.exports = router;