const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getCards);

router.post("/createPost", upload.single("file"), postsController.createCard);

router.put("/likePost/:id", postsController.likeCard);

router.delete("/deletePost/:id", postsController.deleteCard);

module.exports = router;
