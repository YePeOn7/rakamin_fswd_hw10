const router = require('express').Router();
const UsersController = require("../controllers/users.controller.js");
const auth = require("../middlewares/auth.js");

router.get("/", UsersController.findAll);
router.get("/:id", UsersController.findSingle);
router.use(auth.authorization);
router.post("/", UsersController.add);
router.put("/", UsersController.update);
router.delete("/", UsersController.delete);

module.exports = router;