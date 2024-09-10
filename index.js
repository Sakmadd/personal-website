const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');
const { calculateProjectDuration } = require('./assets/script/utils');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Untuk data URL-encoded
app.use(express.json()); // Untuk data JSON, jika diperlukan

// Rute untuk file HTML
app.get('/', home);
app.get('/home', home);
app.get('/contact', contact);
app.get('/detail-project/:id', detailProject);
app.get('/delete-project/:id', deleteProject);
app.get('/edit-project/:id', editProjectView);
app.post('/edit-project/:id', editProject);
app.post('/add-project', addProject);
app.get('/add-project', addProjectView);
app.get('/testimonial', testimonial);

let dataProjects = [];

function home(req, res) {
  res.render('index', { dataProjects });
}

function contact(req, res) {
  res.render('contact');
}

function deleteProject(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = dataProjects.findIndex(project => project.id === id);
  if (index !== -1) {
    dataProjects.splice(index, 1);
    res.redirect('/home');
  } else {
    res.status(404).send('Project not found');
  }
}

function detailProject(req, res) {
  const id = parseInt(req.params.id, 10);
  const project = dataProjects.find(project => project.id === id);
  if (project) {
    res.render('detail-project', { project });
  } else {
    res.status(404).send('Project not found');
  }
}

function addProject(req, res) {
  const { title, startDate, endDate, description, checkbox } = req.body;
  const newId = Date.now(); // Menggunakan timestamp sebagai ID unik
  const data = {
    id: newId,
    title,
    duration: calculateProjectDuration(startDate, endDate),
    description,
    checkbox,
    image: '/assets/images/project1.jpg'
  };
  dataProjects.push(data);
  res.redirect('/home');
}

function addProjectView(req, res) {
  res.render('add-project');
}

function editProjectView(req, res) {
  const id = parseInt(req.params.id, 10);
  const project = dataProjects.find(project => project.id === id);
  if (project) {
    res.render('edit-project', { project });
  } else {
    res.status(404).send('Project not found');
  }
}

function editProject(req, res) {
  const { title, startDate, endDate, description, checkbox } = req.body;
  const id = parseInt(req.params.id, 10);
  const index = dataProjects.findIndex(project => project.id === id);

  if (index !== -1) {
    const updatedProject = {
      ...dataProjects[index], // Pertahankan ID dan image yang sama
      title,
      duration: calculateProjectDuration(startDate, endDate),
      description,
      checkbox
    };

    dataProjects[index] = updatedProject;
    res.redirect('/home');
  } else {
    res.status(404).send('Project not found');
  }
}

function testimonial(req, res) {
  res.render('testimonial');
}

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
