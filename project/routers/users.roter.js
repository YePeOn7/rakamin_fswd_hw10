const router = require('express').Router();
const UsersController = require("../controllers/users.controller.js");

router.get("/", UsersController.findAll);
router.get("/:id", UsersController.findSingle);

router.post("/", UsersController.add);
router.put("/", UsersController.update);
router.delete("/", UsersController.delete);

module.exports = router;