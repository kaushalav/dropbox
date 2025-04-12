require('dotenv').config();

module.exports = {
  APP_PORT: process.env.APP_PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dropbox'
};