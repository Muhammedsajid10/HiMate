const User = require('../models/userModel');
const KYC = require('../models/kycModel');

// Submit KYC details
exports.submitKYC = async (req, res) => {
    try {
        const { userId, fullName, address, phone, email, bankDetails } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const kyc = await KYC.create({
            userId, fullName, address, phone, email, bankDetails,
            status: 'Pending'
        });

        res.status(200).json({ message: "KYC details submitted", kycId: kyc._id });
    } catch (error) {
        res.status(500).json({ message: "Error submitting KYC", error: error.message });
    }
};

// Upload KYC Documents
// exports.uploadKYCFiles = async (req, res) => {
//     try {
//         const { userId, documentType } = req.body;
//         const files = req.files.map(file => ({
//             filename: file.filename,
//             path: file.path
//         }));

//         const kyc = await KYC.findOneAndUpdate(
//             { userId },
//             { $push: { documents: { type: documentType, files } }, status: 'Processing' },
//             { new: true }
//         );

//         res.status(200).json({ message: "Documents uploaded", kyc });
//     } catch (error) {
//         res.status(500).json({ message: "Error uploading documents", error: error.message });
//     }
// };



// exports.uploadKYCFiles = async (req, res) => {
//     try {
//         const { userId, documentType } = req.body;

//         // Check if userId and documentType are provided
//         if (!userId || !documentType) {
//             return res.status(400).json({ message: "Missing userId or documentType" });
//         }

//         // Process uploaded files
//         const files = req.files.map(file => ({
//             filename: file.filename,
//             path: file.path
//         }));

//         // Ensure KYC record exists
//         let kyc = await KYC.findOne({ userId });
//         if (!kyc) {
//             return res.status(404).json({ message: "KYC record not found" });
//         }

//         // Correctly push new documents into the array
//         kyc.documents.push({ type: documentType, files });
//         kyc.status = "Processing"; // Update status after upload
//         await kyc.save();

//         res.status(200).json({ message: "Documents uploaded successfully", kyc });

//     } catch (error) {
//         console.error("Error uploading documents:", error.message);
//         res.status(500).json({ message: "Error uploading documents", error: error.message });
//     }
// };










exports.uploadKYCFiles = async (req, res) => {
    try {
        const { userId, documentType } = req.body;

        if (!userId || !documentType || !req.files) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Map uploaded files correctly
        const files = req.files.map(file => ({
            filename: file.filename,
            path: file.path
        }));

        // Find existing KYC record
        let kyc = await KYC.findOne({ userId });

        if (!kyc) {
            return res.status(404).json({ message: "KYC record not found" });
        }

        // Ensure `documents` is an array before pushing new data
        kyc.documents = kyc.documents || [];

        // Add new document
        kyc.documents.push({ type: documentType, files });
        kyc.status = "Processing"; // Update status after upload
        await kyc.save();

        res.status(200).json({ message: "Documents uploaded successfully", kyc });

    } catch (error) {
        console.error("Error uploading documents:", error.message);
        res.status(500).json({ message: "Error uploading documents", error: error.message });
    }
};













// Check KYC Status
exports.checkKYCStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const kyc = await KYC.findOne({ userId });

        if (!kyc) return res.status(404).json({ message: "KYC not found" });

        res.status(200).json({ message: "KYC status retrieved", status: kyc.status });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving KYC status", error: error.message });
    }
};
