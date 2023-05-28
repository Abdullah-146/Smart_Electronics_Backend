const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,s
        default: "hello",
      },
      url: {
        type: String,
        // required: true,
        default: "hello",
      },
    },
  ],
});

module.exports = mongoose.model("category", categorySchema);
