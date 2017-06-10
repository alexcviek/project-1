const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/project-1';
const secret = process.env.SESSION_SECRET || 'shh it\'s a secret';

module.exports = { port, dbURI, secret };
