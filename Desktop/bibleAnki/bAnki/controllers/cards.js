const cloudinary = require("../middleware/cloudinary");
const Card = require("../models/Card");

module.exports = {
    getProfile: async (req, res) => {
        try {
            const cards = await Card.find({ user: req.user.id });
            res.render("profile.ejs", { cards: cards, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const cards = await Card.find().sort({ createdAt: "desc" }).lean();
            res.render("feed.ejs", { cards: cards });
        } catch (err) {
            console.log(err);
        }
    },
    getCard: async (req, res) => {
        try {
            const card = await Card.findById(req.params.id);
            res.render("card.ejs", { card: card, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },
    createCard: async (req, res) => {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await Card.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
            });
            console.log("Card has been added!");
            res.redirect("/profile");
        } catch (err) {
            console.log(err);
        }
    },
    likeCard: async (req, res) => {
        try {
            await Card.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log("Likes +1");
            res.redirect(`/card/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deleteCard: async (req, res) => {
        try {
            // Find card by id
            let card = await Card.findById({ _id: req.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(card.cloudinaryId);
            // Delete card from db
            await Card.remove({ _id: req.params.id });
            console.log("Deleted Card");
            res.redirect("/profile");
        } catch (err) {
            res.redirect("/profile");
        }
    },
};
