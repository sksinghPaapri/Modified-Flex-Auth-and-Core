const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const diffHistory = require("../plugins/MongooseHistory");
const AppError = require("../../utils/appError");

// FIELDS ARE >>>

const timeEntrySchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Employee must have name"],
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
    Description: {
      type: String,
      required: [true, "Description required !!!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);
module.exports = TimeEntry;
