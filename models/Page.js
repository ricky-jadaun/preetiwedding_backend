const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    enum: ['home', 'attire', 'travel']
  },
  // We use Mixed here to allow different structured schemas for each of the pages ('home', 'attire', 'travel')
  // while keeping the database records clean and separate.
  // The structure of 'en' and 'fr' is strictly defined and validated at the application/controller layer.
  en: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  fr: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
PageSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Page', PageSchema);
