const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
    {
        flexId: {
            type: String,
            unique: true,
            required: [true, 'Please enter account id']
        },
        name: {
            type: String,
            required: [true, 'Please enter account name']
        },
        maxUserCount: {
            type: Number,
            default: 1
        },
        isInactive: {
            type: Boolean,
            default: false
        },
        accountExpiration: {
            type: Date,
            default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000) // Default to 1 year from creation
        },
        contactPerson: {
            type: String
        },
        contactEmail: {
            type: String
        },
        phone: {
            type: String
        },
        industry: {
            type: String
        },
        additionalNotes: {
            type: String
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;