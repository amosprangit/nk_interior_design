require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const store = require('./store');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, database: store.isDb() ? 'mongodb' : 'in-memory sample data' }));
app.use('/api/projects', projectRoutes);

app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.name === 'ValidationError' ? 400 : 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interior_studio', { serverSelectionTimeoutMS: 3000 });
    store.setDb(true);
    console.log('MongoDB connected. Run "npm run seed" once to load the sample projects.');
  } catch (e) {
    console.warn('MongoDB not reachable, serving built-in sample data instead.');
  }
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})();
