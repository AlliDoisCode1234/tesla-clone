const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cardsController = require("../controllers/cards");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Card Routes - simplified for now
router.get("/:id", ensureAuth, cardsController.getCard);

router.post("/createCard", upload.single("file"), cardsController.createCard);

router.put("/likeCard/:id", cardsController.likeCard);

router.delete("/deleteCard/:id", cardsController.deleteCard);

module.exports = router;
