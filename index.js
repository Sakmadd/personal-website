const express = require('express');
const app = express();
require('./middlewares/config')(app);

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);
app.listen(3000, () => {
  console.log('server berjalan')
})
module.exports = app