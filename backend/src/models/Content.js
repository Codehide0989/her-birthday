const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide content title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['note', 'video', 'quiz', 'assignment', 'attachment'],
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    videoProvider: {
      type: String,
      enum: ['youtube', 'vimeo', 'self-hosted', null],
      default: null,
    },
    videoDuration: {
      type: Number,
      default: 0,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
        fileSize: Number,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
      default: 'premium',
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

contentSchema.index({ moduleId: 1, order: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ accessLevel: 1 });

contentSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Content', contentSchema);
