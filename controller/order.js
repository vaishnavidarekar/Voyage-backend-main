const express = require("express");
const auth = require("../middleware/auth");
const Order = require("../model/order");

const router = new express.Router();

router.post("/orders", auth, async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "packageId",
      });

    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/orders/:id", auth, async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOne({ _id: orderId, userId: req.user._id })
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "packageId",
      });

    if (!order) {
      return res.status(404).send({ message: "No order found" });
    }

    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
