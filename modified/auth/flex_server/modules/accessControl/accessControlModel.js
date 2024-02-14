const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AppError = require("../../utils/appError");

const accessControlSchema = mongoose.Schema(
    {
        flexId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        }],
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same!'
            }
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        giveAccess: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)



// This block of code is responsible to hide the badge id in db
accessControlSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the badgeId with cost of 12
    this.password = await bcrypt.hash(this.password, 8);

    // Delete badgeIdConfirm field
    this.passwordConfirm = undefined;
    next();
});


// accessControlSchema.pre(
//     ["updateOne", "findOneAndUpdate"],
//     async function (req, next) {
//         if (!this.getUpdate().giveAccess) next();

//         console.log("update data: ", this);
//         const userDocuments = await this.model.find({ giveAccess: { $eq: true } });
//         if (parseInt(process.env.MAX_USER_COUNT) <= userDocuments.length) {
//             return next(
//                 new AppError(
//                     "You cannot give access to this user! You have already reached maximum user limit!",
//                     400
//                 )
//             );
//         }

//         next();
//     }
// );


accessControlSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

accessControlSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.badgeIdChangedAt) {
        const changedTimestamp = parseInt(
            this.badgeIdChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    // FALSE means NOT Changed
    return false;
};


accessControlSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min from now

    return resetToken;
};



const AccessControl = mongoose.model('AccessControl', accessControlSchema);
module.exports = AccessControl;