const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

require('./middlewares/config')(app);

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
