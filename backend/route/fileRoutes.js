import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import userModel from '../model/userModel.js';
import File from '../model/fileModel.js';
import upload from '../config/multer-config.js';

const router = express.Router();


function formatFileSize(bytes) {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sizeInUnit = bytes / Math.pow(k, i);

    return `${sizeInUnit.toFixed(2)} ${sizes[i]}`;
}

router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const { userId, title = "untitled" } = req.body; // Assuming userId and title are passed in the request body
        console.log(userId)
        const user = await userModel.findById(userId);
        console.log(user)

        if (!user) {
            return res.status(408).json({ error: 'User not found' });
        }

        const uploadedFiles = [];
        const uploadPromises = req.files.map(file => {
            let resourceType = 'auto';
            // if (file.mimetype === 'application/pdf') {
            //     resourceType = 'raw';
            // } else if (file.mimetype.startsWith('video/')) {
            //     resourceType = 'video';
            // } else if (file.mimetype.startsWith('image/')) {
            //     resourceType = 'image';
            // }

            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'MegaShareDocs',
                        resource_type: resourceType,
                    },
                    async (error, result) => {
                        if (error) return reject(error);

                        // Collect uploaded file data
                        const fileData = {
                            filename: file.originalname,
                            fileUrl: result.secure_url,
                            size: formatFileSize(file.size), // Include the file size
                        };

                        uploadedFiles.push(fileData);
                        resolve(fileData);
                    }
                );
                uploadStream.end(file.buffer);
            });
        });

        await Promise.all(uploadPromises);

        // Save file metadata to database
        const newFile = new File({
            title: title,
            files: uploadedFiles,
            userId: user._id,
        });

        await newFile.save();

        res.json(newFile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading files to Cloudinary' });
    }
});

function sizeStringToBytes(sizeStr) {
    const units = {
        'Bytes': 1,
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024,
    };

    const regex = /([\d.]+)\s*(Bytes|KB|MB|GB|TB)/i;
    const match = sizeStr.match(regex);
    if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        return value * (units[unit] || 1);
    }
    return 0;
}

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Route to get all files by user ID and their total size
router.get('/files/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const files = await File.find({ userId: userId });

        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'No files found for this user' });
        }

        let overallTotalBytes = 0;

        // Add quantity property and calculate total size for each file object
        const filesWithQuantityAndSize = files.map(file => {
            const totalBytes = file.files.reduce((acc, f) => acc + sizeStringToBytes(f.size), 0);
            overallTotalBytes += totalBytes;
            const formattedTotalSize = formatBytes(totalBytes);

            return {
                ...file.toObject(),
                quantity: file.files.length,
                totalSize: formattedTotalSize
            };
        });

        const formattedOverallTotalSize = formatBytes(overallTotalBytes);

        res.json({
            files: filesWithQuantityAndSize,
            overallTotalSize: formattedOverallTotalSize
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving files' });
    }
});

export default router;