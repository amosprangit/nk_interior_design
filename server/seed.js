require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const projects = require('./data/projects');

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interior_studio');
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log(`Seeded ${projects.length} projects`);
  await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
