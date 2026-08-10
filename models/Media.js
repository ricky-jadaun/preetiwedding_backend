const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true // e.g. "/uploads/our-story-17123.jpg"
  },
  altText: {
    type: String,
    default: ''
  },
  size: {
    type: Number
  },
  mimetype: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', MediaSchema);
