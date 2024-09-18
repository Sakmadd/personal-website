const express = require('express');
const app = express();
require('./middlewares/config')(app);

const routes = require('./assets/scripts/routes/routes');

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  res.status(500).render('not-found'); 
});

app.listen(3000, () => {
  console.log('server berjalan')
})
module.exports = app