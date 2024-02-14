const express = require("express");
const ClassController = require("./classController");

const router = express.Router();

router.route("/list").get(ClassController.getList);

router.route("/").get(ClassController.getAll).post(ClassController.createOne);

router
  .route("/:id")
  .get(ClassController.getOne)
  .patch(ClassController.updateOne)
  .delete(ClassController.deleteOne);

module.exports = router;
