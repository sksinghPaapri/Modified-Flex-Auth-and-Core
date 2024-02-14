const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please enter name."],
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
