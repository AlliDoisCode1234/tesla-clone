const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  deck: {
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
  textLocation: {
    type: String,
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
