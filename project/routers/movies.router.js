const router = require('express').Router();
const MovieController = require("../controllers/movies.controller.js");
const multerMiddleware = require("../middlewares/multer.js");

router.get("/", MovieController.findAll);
router.get("/:id", MovieController.findSingle);

router.post("/", MovieController.add);
router.put("/", MovieController.update);
router.delete("/", MovieController.delete);
router.post("/upload", multerMiddleware.single('image'), MovieController.upload);

module.exports = router;
