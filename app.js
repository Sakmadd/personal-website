const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');
const routes = require('./assets/scripts/routes/routes')
const { home, contact, addProjectView, detailProject, addProjectPost, deleteProject, editProjectView, editProject, registerPost, loginView, loginPost, registerView, testimonialView, logout } = require('./assets/scripts/routes/controller')
const session = require("express-session");
const flash = require('express-flash')

app.use('/assets', express.static(path.join(__dirname, 'assets')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(flash())
hbs.registerHelper('not', function(value) {
  return !value;
});
app.use(
  session({
    name: "user-session",
    secret: "ewVsqWOyeb",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


app.get(routes.index, home);
app.get(routes.home, home);
app.get(routes.contact, contact);
app.get(routes.testimonial, testimonialView);
app.get(routes.detailProject, detailProject)
app.get(routes.deleteProject, deleteProject);
app.get(routes.addProjectView, addProjectView);
app.get(routes.editProjectView, editProjectView);
app.get(routes.login, loginView)
app.get(routes.register, registerView)
app.post(routes.addProjectPost, addProjectPost);  
app.post(routes.editProjectPost, editProject);
app.post(routes.login, loginPost)
app.post(routes.register, registerPost)
app.post(routes.logout, logout)


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
