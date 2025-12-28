const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a chapter title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
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
    totalModules: {
      type: Number,
      default: 0,
    },
    estimatedDuration: {
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

chapterSchema.virtual('modules', {
  ref: 'Module',
  localField: '_id',
  foreignField: 'chapterId',
});

chapterSchema.index({ subjectId: 1, order: 1 });

chapterSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Chapter', chapterSchema);
