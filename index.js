const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 

// Middleware untuk menyajikan file statis dari folder tertentu
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'pages'))); // Menyajikan file HTML dari folder 'pages'

// Rute untuk file HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/contact.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/projects.html'));
});

app.get('/testimonial', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/testimonial.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
