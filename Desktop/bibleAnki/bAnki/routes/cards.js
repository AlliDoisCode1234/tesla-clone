const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/cards");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Card Routes - simplified for now
router.get("/id", ensureAuth, postsController.getCard);

router.post("/createCard", upload.single("file"), postsController.createCard);

router.put("/likeCard/:id", postsController.likeCard);

router.delete("/deleteCard/:id", postsController.deleteCard);

module.exports = router;
