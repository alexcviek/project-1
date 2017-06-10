const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/project-1';
mongoose.connect(dbURI);

const Aurora = require('../models/aurora');
const User   = require('../models/user');

Aurora.collection.drop();
User.collection.drop();

User
.create([{
  username: 'alex',
  email: 'a.i.cwiek@gmail.com',
  password: 'pass',
  passwordConfirmation: 'pass'
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return Aurora
  .create([{
    country: 'Russia',
    image: 'https://www.northernlightscentre.ca/images/northernlights.jpg'
  },{
    country: 'Finland',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/58/16/c0/5816c0c5978ea14bb7440b855322ff31.jpg'
  },{
    country: 'Norway',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/d7/6c/f9/d76cf928ec8d55ed5a266a1146be9027.jpg'
  }]);
})
.then((auroras) => {
  console.log(`${auroras.length} auroras created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
