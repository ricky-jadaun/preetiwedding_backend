const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Upload image
// @route   POST /api/media/upload
// @access  Protected
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    // Upload image to Cloudinary using file buffer
    const result = await uploadToCloudinary(req.file.buffer);

    const media = await Media.create({
      filename: result.public_id,
      originalname: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      media
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    List all images
// @route   GET /api/media
// @access  Protected
const listImages = async (req, res) => {
  try {
    const mediaList = await Media.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: mediaList.length,
      media: mediaList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete image
// @route   DELETE /api/media/:id
// @access  Protected
const deleteImage = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media file not found in database' });
    }

    // Delete image from Cloudinary (if publicId is stored) or from physical disk (if legacy local file)
    if (media.publicId) {
      try {
        await deleteFromCloudinary(media.publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting file from Cloudinary:', cloudinaryError);
      }
    } else {
      // Legacy support: Delete local file
      const filePath = path.join(__dirname, '../uploads', media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await media.deleteOne();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadImage,
  listImages,
  deleteImage
};
