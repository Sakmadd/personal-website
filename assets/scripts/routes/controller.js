const { PrismaClient } = require('@prisma/client')
const { calculateProjectDuration, capitalizedWords, convertIsoToDate, initialDummyProjects } = require('../utils/utils')
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()
const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

async function home(req, res) {
  let dataProjects = []
 try {
  const user = req.session.user
  if(!user){
    dataProjects = initialDummyProjects
    res.render('index', { 
      dataProjects, 
      user
    });
  }
  else {
    dataProjects = await prisma.project.findMany({
      where : {
        user_id : user.id
      }
    })
    dataProjects.forEach(project => {
      const duration = calculateProjectDuration(project.start_date, project.end_date)
  
      project.duration = duration 
    })
    res.render('index', { 
      dataProjects, 
      user
    });
  }


 } catch (err) {
 }
}
function contact(req, res) {
  res.render('contact');
}
function testimonialView(req, res) {
  res.render('testimonial',);
}
function addProjectView(req, res) {
  res.render('add-project');
}
async function addProjectPost(req, res) {
  const filePath = req.file.path
  if(req.session.user === undefined){ 
    req.flash("error", "Sorry, you have to login before adding projects! 😣"); 
    return res.redirect('/project/add')
  }
  
  const { id } = req.session.user


  let { title, start_date, end_date, description, technologies} = req.body;

  if (!Array.isArray(technologies)) {technologies = [technologies];}
  try {
    cloudinary.uploader.upload(filePath, async (error, result) => {
      if (error) {
        return res.status(500).send('Upload to Cloudinary failed.');
      }
      await prisma.project.create({
        data:{
          title,
          description,
          start_date,
          end_date,
          technologies,
          image: result.secure_url,
          user_id: id
        }
      })
    });    
    res.redirect('/home');
  } catch (error) {
    res.status(500).send('Failed to save image URL.');
  } finally{
  }
}
async function editProjectView(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const project = await prisma.project.findUnique({
      where: {
        id 
      }
    })

    if (project) {
      const date = convertIsoToDate(project.start_date, project.end_date)
      project.start_date = date.start_date
      project.end_date = date.end_date  
      res.render('edit-project', { project });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    res.send(error)
  }
  
}
async function editProjectPost(req, res) {
  const id = parseInt(req.params.id, 10);
  const filePath = req.file.path;
  let { title, start_date, end_date, description, technologies } = req.body;

  if (!Array.isArray(technologies)) {
    technologies = [technologies];
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    cloudinary.uploader.upload(filePath, async (error, result) => {
      if (error) {
        return res.status(500).send('Upload to Cloudinary failed.');
      }
      try {
        await prisma.project.update({
          where: { id },
          data: {
            title,
            start_date,
            end_date,
            description,
            technologies,
            image: result.secure_url,
          },
        });
        fs.unlinkSync(filePath);
        res.redirect('/home');
      } catch (error) {
        return res.status(500).send('Failed to update project.');
      }
    });
  } catch (error) {
    return res.status(500).send('Internal server error.');
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
    const { email, password } = req.body
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) {
      req.flash('error', 'Wait!, your email or password is not right ! 🤔');
      return res.redirect("/login");
    }
    bcrypt.compare(password, user.password, (err,result) => {
      if (err) {
        req.flash("error", "something went wrong i can feel it! 😞");
        res.redirect("/");
      } else if(result) {
        req.session.user = user;  
        req.flash('success', 'Youre successfully logged in! 🙌')
        res.redirect('/login')
      }else {
        req.flash('error', 'Wait!, your email or password was not right! 🤔');
        res.redirect("/login");
      }
    })
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