// const mongoose = require('mongoose');

// const KYCSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     fullName: String,
//     address: String,
//     phone: String,
//     email: String,
//     bankDetails: {
//         registeredName: String,
//         ifscCode: String,
//         accountNumber: String
//     },
//     documents: [{
//         type: String, // "Adhaar Card", "Driving License", etc.
//         files: [{
//             filename: String,
//             path: String
//         }]
//     }],
//     status: { type: String, enum: ['Pending', 'Processing', 'Verified', 'Rejected'], default: 'Pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('KYC', KYCSchema);














const mongoose = require('mongoose');

const KYCSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: String,
    address: String,
    phone: String,
    email: String,
    bankDetails: {
        registeredName: String,
        ifscCode: String,
        accountNumber: String
    },
    documents: [{
        type: { type: String }, // Fix this: use an object with `type` key
        files: [{
            filename: String,
            path: String
        }]
    }],
    status: { type: String, enum: ['Pending', 'Processing', 'Verified', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('KYC', KYCSchema);
