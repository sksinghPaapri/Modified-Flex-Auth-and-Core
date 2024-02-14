const TimeEntry = require("./timeEntryModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.timeEntryList = catchAsync(async (req, res) => {
  const timeEntry = await TimeEntry.find().select("_id name");
  res.status(200).json({
    isSuccess: true,
    status: "success",
    results: timeEntry.length,
    documents: timeEntry,
  });
});

exports.getAlltimeEntry = catchAsync(async (req, res) => {
  try {
    const timeEntry = await TimeEntry.find();
    res.status(200).json({
      isSuccess: true,
      status: "success",
      results: timeEntry.length,
      documents: timeEntry,
    });
  } catch (error) {
    console.log(error);
  }
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await TimeEntry.create(req.body);
  res.status(201).json({
    isSuccess: true,
    status: "success",
    results: doc.length,
    document: doc,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  let query = TimeEntry.findById(req.params.id);
  const doc = await query;

  if (!doc) {
    return next(new AppError("No TImeEntry found with the ID", 404));
  }
  res.status(200).json({
    isSuccess: true,
    status: "success",
    results: doc.length,
    document: doc,
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await TimeEntry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("No TimeEntry found with the ID", 404));
  }
  res.status(201).json({
    isSuccess: true,
    status: "success",
    document: doc,
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await TimeEntry.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("No TimeEntry found with the ID", 404));
  }
  res.status(204).json({
    isSuccess: true,
    status: "success",
  });
});
