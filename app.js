const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const hbs = require('hbs');
const routes = require('./assets/scripts/routes/routes')
const { home, contact, testimonial, addProjectView, detailProject, addProjectPost, deleteProject, editProjectView, editProject } = require('./assets/scripts/routes/controller')



app.use('/assets', express.static(path.join(__dirname, 'assets')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.get(routes.index, home);
app.get(routes.home, home);
app.get(routes.contact, contact);
app.get(routes.testimonial, testimonial);
app.get(routes.addProjectView, addProjectView);
app.post(routes.addProjectPost, addProjectPost);
app.delete(routes.deleteProject, deleteProject);
app.get(routes.editProjectView, editProjectView);
app.post(routes.editProject, editProject);



app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
