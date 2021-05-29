const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bibleID: {
    type: Number,
    required: true,
  },
  front: {
    type: String,
    require: true,
  },
  back: {
    type: String,
    require: true,
  },
  tags: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
