const mongoose = require('mongoose');

const auroraSchema = new mongoose.Schema({
  country: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Aurora', auroraSchema);
