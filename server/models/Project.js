const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    poster: String, // thumbnail for videos
    caption: String
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, enum: ['residential', 'commercial'], required: true, index: true },
    region: { type: String, enum: ['india', 'global'], required: true, index: true },
    location: String,
    year: Number,
    area: String,
    description: String,
    cover: String,
    featured: { type: Boolean, default: false },
    media: [mediaSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
