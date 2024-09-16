const express = require('express');
const path = require('path');
const app = express();

require('./middlewares/config')(app);

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);

