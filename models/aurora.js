const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const auroraSchema = new mongoose.Schema({
  country: { type: String, required: true },
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

auroraSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi27/${this.image}`;
  });

auroraSchema.methods.belongsTo = function auroraBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};
module.exports = mongoose.model('Aurora', auroraSchema);
