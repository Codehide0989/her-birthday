const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a subject title'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: '#3B82F6',
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
    totalChapters: {
      type: Number,
      default: 0,
    },
    totalModules: {
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

subjectSchema.virtual('chapters', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'subjectId',
});

subjectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Subject', subjectSchema);
