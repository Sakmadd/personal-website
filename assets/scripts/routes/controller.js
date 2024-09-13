const { PrismaClient } = require('@prisma/client')
const { calculateProjectDuration, capitalizedWords } = require('../utils/utils')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function home(req, res) {
 try {
  const user = req.session.user
  const dataProjects = await prisma.project.findMany({})
  const duration = calculateProjectDuration(dataProjects[0].start_date, dataProjects[0].end_date)

  dataProjects[0].duration = duration
  res.render('index', { 
    dataProjects, 
    user
  });
 } catch (err) {
  
 }
}
function contact(req, res) {
  const user = req.session.user
  res.render('contact',{user});
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
function testimonialView(req, res) {
  const user = req.session.user
  res.render('testimonial',{user});
}
function addProjectView(req, res) {
  const user = req.session.user
  res.render('add-project', { user });
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
  const dataProject = await prisma.project.findUnique({where: {id}})
  const duration = calculateProjectDuration(dataProject.start_date, dataProject.end_date)
  dataProject.duration = duration  
  if (dataProject) {
    res.render('detail-project', { project : dataProject });
  } else {
    res.status(404).send('Project not found');
  }
}
function registerView(req,res) {
  res.render('register')
}
async function registerPost(req,res) {
  try{
    const { name, email, password } = req.body
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    req.flash("success", "Yeay!, you successfully registered 🙌")
    res.redirect('/login')
  } catch {
    req.flash("error", "Sorry, this email has been registered! 😣");
    res.redirect("/register")
  } 

}
function loginView(req,res) {
  const user = req.session.user
  if (user) {
    const newName = capitalizedWords(user.name)
    user.name = newName
  }

  res.render('login',{user})
}
async function loginPost(req,res) {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({where: {email}})

    if (!user) {
      req.flash('error', 'Wait!, your email or password is not right ! 🤔');
      return res.redirect("/login");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      req.flash('error', 'Wait!, your email or password is not right2! 🤔');
      return res.redirect("/login");
    }

    req.session.user = user;  

    req.flash('success', 'Youre successfully logged in! 🙌')
    res.redirect('/login')


  }catch {
    req.flash("error", "something went wrong i can feel it! 😞");
    res.redirect("/");
  }
}
function logout(req,res) {
  req.session.destroy(err => {
    if (err) {
        return res.status(500).send('Failed to destroy session.');
    }
    res.redirect('/login'); 
});
}

module.exports = { 
  home, 
  contact, 
  addProjectPost, 
  testimonialView, 
  addProjectView, 
  editProjectView, 
  editProject, 
  deleteProject, 
  detailProject , 
  loginPost, 
  loginView, 
  registerPost, 
  registerView, 
  logout
}
