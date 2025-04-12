const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const cors = require('cors');
const config = require('./config');  

const fileRoutes = require('./routes/fileRoutes');
const app = express();
app.use(logger);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const mongoUri = config.MONGO_URI || 'mongodb://mongo:27017/dropbox';

// MongoDB connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// API routes
app.use('/', fileRoutes);

app.listen(config.APP_PORT, () => console.log(`Server running on port ${config.APP_PORT}`));