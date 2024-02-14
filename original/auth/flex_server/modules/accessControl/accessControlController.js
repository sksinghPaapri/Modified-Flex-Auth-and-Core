const AccessControl = require('./accessControlModel')
const Account = require('../account/accountModel');
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");


exports.updateOne = catchAsync(async (req, res, next) => {

    const { email, flexId, giveAccess } = req.body;

    console.log(email, flexId, giveAccess);
    const userDoc = await AccessControl.findOneAndUpdate({ email: email }, {
        giveAccess
    });

    if (!userDoc)
        return res.status(200).json({
            isSuccess: false,
            document: null
        });


    res.status(200).json({
        isSuccess: true,
        document: userDoc
    });

})


exports.createOne = catchAsync(async (req, res, next) => {

    const { email, flexId, password, passwordConfirm, giveAccess } = req.body;

    const userDoc = await AccessControl.findOne({ email: email });


    if (userDoc) {
        const accountDoc = await Account.findOne({ flexId: flexId });
        console.log(accountDoc._id);
        const doc = await AccessControl.findByIdAndUpdate(
            {
                _id: userDoc._id,
            }, {
            $addToSet: { flexId: accountDoc._id }
        }, { new: true })

        res.status(201).json({
            isSuccess: true,
            document: doc
        });
    } else {
        const accountDoc = await Account.findOne({ flexId: flexId });
        if (!accountDoc) {
            return next(
                new AppError(
                    "You have provided wrong flex id",
                    401
                )
            );
        }

        const doc = await AccessControl.create({
            flexId: [accountDoc?._id],
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            giveAccess: giveAccess
        });

        res.status(201).json({
            isSuccess: true,
            document: doc
        });

    }





})




