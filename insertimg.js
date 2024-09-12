const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Konfigurasi koneksi PostgreSQL
const client = new Client({
  user: 'postgres',         // Gantilah dengan nama pengguna PostgreSQL
  host: 'localhost',
  database: 'personal-web', // Gantilah dengan nama database
  password: '1234',     // Gantilah dengan password PostgreSQL
  port: 5432,
});

// Fungsi untuk membaca gambar dari file dan mengonversi ke format biner
function readImage(filePath) {
  return fs.readFileSync(filePath);
}

// Fungsi untuk menyisipkan gambar ke dalam database
async function insertImageToDb(imagePath) {
  try {
    await client.connect();

    // Membaca gambar
    const imageData = readImage(imagePath);

    // Query SQL untuk menyisipkan gambar
    const query = `
      INSERT INTO public.projects(
        id, name, description, technologies, image, start_date, end_date)
      VALUES (
        '2233', 
        'lorem ipsum dolor sit amet ngentot', 
        'react dan kawan kawan', 
        'Node.js, React', 
        $1,
        '2024-11-10',
        '2024-12-10'
      );
    `;

    // Menjalankan query
    await client.query(query, [imageData]);

    console.log('Image inserted successfully.');

  } catch (error) {
    console.error('Error inserting image:', error);
  } finally {
    await client.end();
  }
}

// Path ke file gambar
const imagePath = path.join('C:', 'All Main Storage', 'Download', 'project1.jpg');

// Menyisipkan gambar ke dalam database
insertImageToDb(imagePath);
