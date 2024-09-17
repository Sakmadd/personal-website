const express = require('express');
const app = express();
require('./middlewares/config')(app);
const port = 3000

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app