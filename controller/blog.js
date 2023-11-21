const express = require("express");
const Blog = require("../model/blog");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/blogs", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const blog = new Blog(req.body);

    await blog.save();

    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ error: "blog not found" });
    }

    res.status(200).send(blog);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
