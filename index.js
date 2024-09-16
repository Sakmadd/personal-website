const express = require('express');
const app = express();

require('./middlewares/config')(app);

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);

module.exports = app

