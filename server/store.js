// Data layer: uses MongoDB when connected, otherwise falls back to the in-memory sample data
// so the site still runs locally even if MongoDB isn't installed yet.
const Project = require('./models/Project');
const seed = require('./data/projects');

let useDb = false;
const byNewest = (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.year || 0) - (a.year || 0);

module.exports = {
  setDb: (v) => { useDb = v; },
  isDb: () => useDb,

  async list({ category, region } = {}) {
    const filter = {};
    if (category) filter.category = category;
    if (region) filter.region = region;
    if (useDb) return Project.find(filter).sort({ featured: -1, year: -1 }).lean();
    return seed.filter((p) => Object.entries(filter).every(([k, v]) => p[k] === v)).sort(byNewest);
  },

  async get(idOrSlug) {
    if (useDb) {
      const q = /^[0-9a-fA-F]{24}$/.test(idOrSlug) ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] } : { slug: idOrSlug };
      return Project.findOne(q).lean();
    }
    return seed.find((p) => p.slug === idOrSlug) || null;
  }
};
