const express = require('express');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Module = require('../models/Module');
const Content = require('../models/Content');
const { protect, authorize, checkPremiumAccess } = require('../middleware/auth');

const router = express.Router();

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({ isPublished: true }).sort({ order: 1 });
    res.json({ success: true, data: { subjects } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/subjects/:subjectId/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.find({
      subjectId: req.params.subjectId,
      isPublished: true,
    }).sort({ order: 1 });
    res.json({ success: true, data: { chapters } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/chapters/:chapterId/modules', async (req, res) => {
  try {
    const modules = await Module.find({
      chapterId: req.params.chapterId,
      isPublished: true,
    }).sort({ order: 1 });
    res.json({ success: true, data: { modules } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/modules/:moduleId/contents', protect, async (req, res) => {
  try {
    const query = {
      moduleId: req.params.moduleId,
      isPublished: true,
    };

    if (!req.user.hasPremiumAccess() && req.user.role !== 'admin') {
      query.accessLevel = 'free';
    }

    const contents = await Content.find(query).sort({ order: 1 });
    res.json({ success: true, data: { contents } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/contents/:contentId', protect, async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId);

    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }

    if (content.accessLevel === 'premium' && !req.user.hasPremiumAccess() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Premium subscription required',
        requiresSubscription: true,
      });
    }

    res.json({ success: true, data: { content } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/subjects', protect, authorize('admin'), async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: { subject } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/chapters', protect, authorize('admin'), async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json({ success: true, data: { chapter } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/modules', protect, authorize('admin'), async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json({ success: true, data: { module } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/contents', protect, authorize('admin'), async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ success: true, data: { content } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
