const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const s3 = require('../lib/s3');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  facebookId: { type: Number },
  password: { type: String },
  places: [ placeSchema ]
});

userSchema.pre('save', function checkPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});

userSchema
.virtual('imageSRC')
.get(function getImageSRC() {
  if(!this.image) return null;
  if(this.image.match(/^http/)) return this.image;
  if(this.image.match(/assets/)) return this.image;
  return `https://s3-eu-west-1.amazonaws.com/wdi27/${this.image}`;
});

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this.password && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('remove', function removeImage(next) {
  if(!this.image) return next();
  s3.deleteObject({ Key: this.image }, next);
});

module.exports = mongoose.model('User', userSchema);
