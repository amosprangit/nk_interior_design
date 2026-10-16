const express = require('express');
const Project = require('../models/Project');
const store = require('../store');

const router = express.Router();
const CATEGORIES = ['residential', 'commercial'];
const REGIONS = ['india', 'global'];

const requireAdmin = (req, res, next) => {
  if (req.get('x-admin-key') !== process.env.ADMIN_KEY) return res.status(401).json({ message: 'Invalid admin key' });
  if (!store.isDb()) return res.status(503).json({ message: 'Database not connected' });
  next();
};

// GET /api/projects?category=residential|commercial&region=india|global
router.get('/', async (req, res, next) => {
  try {
    const { category, region } = req.query;
    if (category && !CATEGORIES.includes(category)) return res.status(400).json({ message: 'Invalid category' });
    if (region && !REGIONS.includes(region)) return res.status(400).json({ message: 'Invalid region' });
    const data = await store.list({ category, region });
    res.json({ count: data.length, data });
  } catch (e) { next(e); }
});

// Shortcuts: GET /api/projects/residential and /api/projects/commercial (optional ?region=)
CATEGORIES.forEach((category) => {
  router.get(`/${category}`, async (req, res, next) => {
    try {
      const region = REGIONS.includes(req.query.region) ? req.query.region : undefined;
      const data = await store.list({ category, region });
      res.json({ count: data.length, data });
    } catch (e) { next(e); }
  });
});

router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const project = await store.get(req.params.idOrSlug);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ data: project });
  } catch (e) { next(e); }
});

// ---- Admin (protected with x-admin-key header) ----
router.post('/', requireAdmin, async (req, res, next) => {
  try { res.status(201).json({ data: await Project.create(req.body) }); } catch (e) { next(e); }
});
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: 'Project not found' });
    res.json({ data: p });
  } catch (e) { next(e); }
});
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const p = await Project.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
