const express = require("express");
const Guide = require("../model/guide");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/guides", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const guide = new Guide(req.body);

    await guide.save();

    res.status(201).send(guide);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/guides", async (req, res) => {
  try {
    const guides = await Guide.find();

    res.status(200).send(guides);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/guides/:id", async (req, res) => {
  try {
    const guideId = req.params.id;

    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).send({ error: "guide not found" });
    }

    res.status(200).send(guide);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
