const { default: mongoose } = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, default: "Admin" },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
