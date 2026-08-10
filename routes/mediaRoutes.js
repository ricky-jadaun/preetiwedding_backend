const express = require('express');
const router = express.Router();
const { uploadImage, listImages, deleteImage } = require('../controllers/mediaController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('image'), uploadImage);
router.get('/', protect, listImages);
router.delete('/:id', protect, deleteImage);

module.exports = router;
