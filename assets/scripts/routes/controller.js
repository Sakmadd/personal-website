const { calculateProjectDuration } = require('../utils/utils')

let dataProjects = []

function home(req, res) {
  res.render('index', { dataProjects });
}
function contact(req, res) {
  res.render('contact');
}
function addProjectPost(req, res) {
  const { title, startDate, endDate, description, checkbox } = req.body;
  const newId = Date.now();
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
function testimonial(req, res) {
  res.render('testimonial');
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
      ...dataProjects[index], 
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

module.exports = { home, contact, addProjectPost, testimonial, addProjectView, editProjectView, editProject, deleteProject, detailProject }
