const { PrismaClient } = require('@prisma/client')
const { calculateProjectDuration, capitalizedWords } = require('../utils/utils')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function home(req, res) {
 try {
  const user = req.session.user
  const dataProjects = await prisma.project.findMany({})
  dataProjects.forEach(project => {
    const duration = calculateProjectDuration(project.start_date, project.end_date)
    project.duration = duration 
  })
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
async function editProjectPost(req, res) {
  const { title, start_date, end_date, description, technologies } = req.body;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  console.log('Updating project ID:', id);
  console.log('Update data:', { title, start_date, end_date, description, technologies, image: '/assets/images/project1.jpg' });

  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        start_date,
        end_date,
        description,
        technologies,
        image: '/assets/images/project1.jpg',
      },
    });

    console.log('Updated project:', updatedProject);
    res.redirect('/home')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
  editProjectPost, 
  deleteProject, 
  detailProject , 
  loginPost, 
  loginView, 
  registerPost, 
  registerView, 
  logout
}
