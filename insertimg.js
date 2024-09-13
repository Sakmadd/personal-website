const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'personal-web',
  password: '1234',
  port: 5432,
});

function readImage(filePath) {
  return fs.readFileSync(filePath);
}

async function insertImageToDb(imagePath) {
  try {
    await client.connect();

    const imageData = readImage(imagePath);

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

    await client.query(query, [imageData]);

    console.log('Image inserted successfully.');

  } catch (error) {
    console.error('Error inserting image:', error);
  } finally {
    await client.end();
  }
}

const imagePath = path.join('C:', 'All Main Storage', 'Download', 'project1.jpg');

insertImageToDb(imagePath);
