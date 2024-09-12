const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
  user: 'postgres',         // Gantilah dengan nama pengguna PostgreSQL
  host: 'localhost',
  database: 'personal-web', // Gantilah dengan nama database
  password: '1234',     // Gantilah dengan password PostgreSQL
  port: 5432,
});

// Endpoint untuk menampilkan gambar
app.get('/image/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT image FROM public.projects WHERE id = $1', [imageId]);
    client.release();

    if (result.rows.length > 0) {
      const imageData = result.rows[0].image;

      // Menyajikan gambar sebagai respons HTTP
      res.setHeader('Content-Type', 'image/png'); // Sesuaikan dengan tipe gambar jika perlu
      res.send(imageData);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
