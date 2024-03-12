const router = require('express').Router();
const pool = require('../config/db_config.js');
const MovieController = require("../controllers/movies.controller.js");

router.get("/", MovieController.findAll);
router.get("/:id", MovieController.findSingle);

router.post("/", MovieController.add);
router.put("/", MovieController.update);
router.delete("/", MovieController.delete);

module.exports = router;
