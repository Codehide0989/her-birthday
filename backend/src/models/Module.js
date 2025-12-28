const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a module title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    accessLevel: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    estimatedDuration: {
      type: Number,
      default: 0,
    },
    totalContent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

moduleSchema.virtual('contents', {
  ref: 'Content',
  localField: '_id',
  foreignField: 'moduleId',
});

moduleSchema.index({ chapterId: 1, order: 1 });

moduleSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Module', moduleSchema);
