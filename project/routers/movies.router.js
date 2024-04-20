const router = require('express').Router();
const MovieController = require("../controllers/movies.controller.js");
const multerMiddleware = require("../middlewares/multer.js");
const auth = require("../middlewares/auth.js");

router.get("/", MovieController.findAll);
router.get("/:id", MovieController.findSingle);
router.use(auth.authorization);
router.post("/", MovieController.add);
router.put("/", MovieController.update);
router.delete("/", MovieController.delete);
router.post("/upload", multerMiddleware.single('file'), MovieController.upload);

module.exports = router;
