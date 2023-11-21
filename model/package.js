const { default: mongoose, Schema } = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    itinerary: [{ day: { type: Number }, activities: { type: [String] } }],
    guides: [{ type: Schema.Types.ObjectId, ref: "Guide" }],
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
