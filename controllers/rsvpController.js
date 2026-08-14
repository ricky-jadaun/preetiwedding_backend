const Rsvp = require('../models/Rsvp');

// @desc    Submit RSVP
// @route   POST /api/rsvp
// @access  Public
const submitRsvp = async (req, res) => {
  const {
    firstName,
    lastName,
    childrenCount,
    email,
    whatsapp,
    attending,
    datesInIndia,
    dietary,
    specialNeeds
  } = req.body;

  if (!firstName || !lastName || !email || !whatsapp || !attending) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields (First Name, Last Name, Email, WhatsApp, Attendance)'
    });
  }

  try {
    const rsvp = await Rsvp.create({
      firstName,
      lastName,
      childrenCount,
      email,
      whatsapp,
      attending,
      datesInIndia,
      dietary,
      specialNeeds
    });

    res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully',
      rsvp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all RSVP submissions
// @route   GET /api/rsvp
// @access  Protected
const listRsvps = async (req, res) => {
  try {
    const rsvps = await Rsvp.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: rsvps.length,
      rsvps
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete RSVP submission
// @route   DELETE /api/rsvp/:id
// @access  Protected
const deleteRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id);

    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'RSVP entry not found' });
    }

    await rsvp.deleteOne();

    res.json({
      success: true,
      message: 'RSVP entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitRsvp,
  listRsvps,
  deleteRsvp
};
