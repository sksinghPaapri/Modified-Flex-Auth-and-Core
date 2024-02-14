const Account = require('./accountModel')
const handlerFactory = require('../handlerFactory/handlerFactory');
const catchAsync = require('../../utils/catchAsync');

//exports.getAll = handlerFactory.getAll(Account);
exports.getAll = catchAsync(async (req, res, next) => {

    const docs = await Account.find({ _id: { $in: req.user.flexId } }).sort({ flexId: 1 });
    res.status(200).json({
        isSuccess: true,
        status: 'success',
        results: docs.length,
        documents: docs
    })

})
exports.getOne = handlerFactory.getOne(Account);
exports.createOne = handlerFactory.createOne(Account);
exports.updateOne = handlerFactory.updateOne(Account);
exports.deleteOne = handlerFactory.deleteOne(Account);


