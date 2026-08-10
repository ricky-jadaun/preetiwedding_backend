const express = require('express');
const router = express.Router();
const { getPageContent, updatePageContent } = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:pageId', getPageContent);
router.put('/:pageId', protect, updatePageContent);

module.exports = router;
