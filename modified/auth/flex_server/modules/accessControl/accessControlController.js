const AccessControl = require("./accessControlModel");
const Account = require("../account/accountModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.updateOne = catchAsync(async (req, res, next) => {
  const { email, flexId, giveAccess } = req.body;

  console.log("req.body", email, flexId, giveAccess);
  const accountFromFlexId = await Account.findOne({ flexId: flexId });
  if (!accountFromFlexId) {
    return next(new AppError("You have provided wrong flex id", 401));
  }

  //   from account find maxUserCount are
  const maxUserCountNumbers = accountFromFlexId?.maxUserCount;

  //  find active user from user list
  const activeUser = await AccessControl.aggregate([
    {
      $match: {
        giveAccess: true,
        flexId: accountFromFlexId?._id,
      },
    },
  ]);

  //   check condition for active user and maxUserCount
  if (maxUserCountNumbers > activeUser.length) {
    // if max user count is more than active user
    const userDoc = await AccessControl.findOneAndUpdate(
      { email: email },
      {
        giveAccess,
      },
      { new: true }
    );

    if (!userDoc)
      return res.status(200).json({
        isSuccess: false,
        document: null,
      });

    res.status(200).json({
      isSuccess: true,
      document: userDoc,
    });
  } else {
    return next(
      new AppError(
        "Already reached maximum user Active limit so no more user not allowed to set",
        401
      )
    );
  }
});

exports.createOne = catchAsync(async (req, res, next) => {
  const { email, flexId, password, passwordConfirm, giveAccess } = req.body;

  if (!email || !flexId || !password || !passwordConfirm) {
    res.status(404).json({
      isSuccess: false,
      document: null,
      message: "Please provide proper data!!!",
    });
  }

  const accountFromFlexId = await Account.findOne({ flexId: flexId });
  if (!accountFromFlexId) {
    return next(new AppError("You have provided wrong flex id", 401));
  }

  //   from account find maxUserCount are
  const maxUserCountNumbers = accountFromFlexId?.maxUserCount;

  //  find active user from user list
  const activeUser = await AccessControl.aggregate([
    {
      $match: {
        giveAccess: true,
        flexId: accountFromFlexId?._id,
      },
    },
  ]);

  if (giveAccess == true) {
    if (maxUserCountNumbers > activeUser.length) {
      const userDoc = await AccessControl.findOne({ email: email });

      if (userDoc) {
        const accountDoc = await Account.findOne({ flexId: flexId });
        // console.log(accountDoc._id);
        const doc = await AccessControl.findByIdAndUpdate(
          {
            _id: userDoc._id,
          },
          {
            $addToSet: { flexId: accountDoc._id },
          },
          { new: true }
        );
        console.log(`7`);

        res.status(201).json({
          isSuccess: true,
          document: doc,
        });
      } else {
        const accountDoc = await Account.findOne({ flexId: flexId });
        if (!accountDoc) {
          return next(new AppError("You have provided wrong flex id", 401));
        }

        const doc = await AccessControl.create({
          flexId: [accountDoc?._id],
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          giveAccess: giveAccess,
        });
        console.log(`8`);

        res.status(201).json({
          isSuccess: true,
          document: doc,
        });
      }
    } else {
      return next(
        new AppError(
          "Already reached maximum user active limit no more registration allowed",
          401
        )
      );
    }
  } else {
    const userDoc = await AccessControl.findOne({ email: email });

    if (userDoc) {
      const accountDoc = await Account.findOne({ flexId: flexId });
      const doc = await AccessControl.findByIdAndUpdate(
        {
          _id: userDoc._id,
        },
        {
          $addToSet: { flexId: accountDoc?._id },
        },
        { new: true }
      );

      res.status(201).json({
        isSuccess: true,
        document: doc,
      });
    } else {
      const accountDoc = await Account.findOne({ flexId: flexId });
      if (!accountDoc) {
        return next(new AppError("You have provided wrong flex id", 401));
      }

      const doc = await AccessControl.create({
        flexId: [accountDoc?._id],
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        giveAccess: false,
      });

      res.status(201).json({
        isSuccess: true,
        document: doc,
      });
    }
  }
});
