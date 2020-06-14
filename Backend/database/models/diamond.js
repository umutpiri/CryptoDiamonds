const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define Schema
const diamondSchema = new Schema({
  id: { type: String, unique: true, required: true },
  color: { type: String, unique: false, required: true },
  parents: [{ type: Schema.Types.ObjectId, ref: "Diamond" }],
  owner: String,
  is_sale: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
});

// Define schema methods
diamondSchema.methods = {};

const Diamond = mongoose.model("Diamond", diamondSchema);
module.exports = Diamond;
