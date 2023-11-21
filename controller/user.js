const experss = require("express");
const User = require("../model/user");
const auth = require("../middleware/auth");

const router = new experss.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to Voyage backend" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send({ message: "logout successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send({ message: "logout successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/users/profile", auth, (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send({ message: "No users found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "No user found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/users", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "password"];
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "invalid updates..!!" });
  }

  try {
    const user = req.user;

    requestedUpdates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/users", auth, async (req, res) => {
  try {
    const user = req.user;
    await User.deleteOne({ _id: user._id });

    res.status(200).send(req.user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
