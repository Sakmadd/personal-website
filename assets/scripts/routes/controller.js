const { PrismaClient } = require('@prisma/client')
const { calculateProjectDuration } = require('../utils/utils')

const prisma = new PrismaClient()
let dataProjects = []
async function home(req, res) {
  const dataProjects = await prisma.project.findMany({})
  res.render('index', { dataProjects });
}
function contact(req, res) {
  res.render('contact');
}
async function addProjectPost(req, res) {
  const { title, start_date, end_date, description, technologies} = req.body;

  await prisma.project.create({
    data:{
      title,
      description,
      start_date,
      end_date,
      technologies,
      image: '/assets/images/project1.jpg'
      
    }
  })

  res.redirect('/home');
}
function testimonial(req, res) {
  res.render('testimonial');
}
function addProjectView(req, res) {
  res.render('add-project');
}
async function editProjectView(req, res) {
  const id = parseInt(req.params.id, 10);
  const project = await prisma.project.findUnique({
    where: {
      id 
    }
  })
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
async function deleteProject(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = await prisma.project.findUnique({where: {id,}})
  if (user) {
    await prisma.project.delete({where: {id,},})
    res.redirect('/home');
  } else {
    res.status(404).send('Project not found');
  }
}
async function detailProject(req, res) {
  const id = parseInt(req.params.id, 10);
  const project = await prisma.project.findUnique({
    where: {
      id 
    }
  })
  if (project) {
    res.render('detail-project', { project });
  } else {
    res.status(404).send('Project not found');
  }
}

module.exports = { home, contact, addProjectPost, testimonial, addProjectView, editProjectView, editProject, deleteProject, detailProject }
