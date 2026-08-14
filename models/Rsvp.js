const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  childrenCount: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true
  },
  attending: {
    type: String,
    required: [true, 'Attendance selection is required'],
    enum: ['accept', 'decline']
  },
  datesInIndia: {
    type: String,
    trim: true
  },
  dietary: {
    type: String,
    trim: true
  },
  specialNeeds: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Rsvp', RsvpSchema);
