const { default: mongoose } = require("mongoose");

const guideSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    expertise: { type: [String] },
    languages: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
