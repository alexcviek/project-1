const express = require('express');
const app = express();
const { port } = require('./config/environment');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Express is listening on port ${port}`));