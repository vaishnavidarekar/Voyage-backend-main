const { default: mongoose, Schema } = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    plan: { type: String, required: true },
    paymentMode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
