const router = require('express').Router();
const MovieController = require("../controllers/movies.controller.js");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

router.get("/", MovieController.findAll);
router.get("/:id", MovieController.findSingle);

router.post("/", MovieController.add);
router.put("/", MovieController.update);
router.delete("/", MovieController.delete);
router.post("/upload", upload.single('photo'),MovieController.upload);


module.exports = router;
