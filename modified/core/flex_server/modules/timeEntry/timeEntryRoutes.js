const express = require("express");
const timeEntryController = require("./timeEntryController");

// ROUTES
const router = express.Router();

router.route("/list").get(timeEntryController.timeEntryList);

router
  .route("/")
  .get(timeEntryController.getAlltimeEntry)
  .post(timeEntryController.createOne);

router
  .route("/:id")
  .get(timeEntryController.getOne)
  .patch(timeEntryController.updateOne)
  .delete(timeEntryController.deleteOne);

module.exports = router;
