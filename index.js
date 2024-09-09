const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');

// Middleware untuk menyajikan file statis dari folder tertentu
app.use('/assets', express.static(path.join(__dirname, 'assets')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Mengatur view engine menjadi hbs
app.set('view engine', 'hbs');

// Mengatur direktori views
app.set('views', path.join(__dirname, 'views'));

// Rute untuk file HTML
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/projects', (req, res) => {
  res.render('add-projects');
});

app.get('/testimonial', (req, res) => {
  res.render('testimonial');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
