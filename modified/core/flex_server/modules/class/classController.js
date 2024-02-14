const Class = require("./classModel");
const handlerFactory = require("../handlerFactory/handlerFactory");
const catchAsync = require("../../utils/catchAsync");

exports.getAll = handlerFactory.getAll(Class);
exports.getOne = handlerFactory.getOne(Class);
exports.createOne = handlerFactory.createOne(Class);
exports.updateOne = handlerFactory.updateOne(Class);
exports.deleteOne = handlerFactory.deleteOne(Class);

exports.getList = catchAsync(async (req, res, next) => {
  const docs = await Class.find().select("id name").sort({ name: 1 });
  res.status(200).json({
    isSuccess: true,
    status: "success",
    results: docs.length,
    documents: docs,
  });
});
