const express = require("express");
const auth = require("../middleware/auth");
const Package = require("../model/package");

const router = new express.Router();

router.post("/packages", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).send({ error: "unAuthorized..!!" });
    }

    const package = new Package(req.body);

    await package.save();

    res.status(201).send(package);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find().populate({ path: "guides" });

    res.status(200).send(packages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/packages/:id", async (req, res) => {
  try {
    const packageId = req.params.id;

    const package = await Package.findById(packageId).populate({
      path: "guides",
    });

    if (!package) {
      return res.status(404).send({ error: "package not found" });
    }

    res.status(200).send(package);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
