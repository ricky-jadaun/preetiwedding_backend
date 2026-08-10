const express = require('express');
const router = express.Router();
const { submitRsvp, listRsvps, deleteRsvp } = require('../controllers/rsvpController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitRsvp); // Public submission
router.get('/', protect, listRsvps); // Protected list
router.delete('/:id', protect, deleteRsvp); // Protected delete

module.exports = router;
