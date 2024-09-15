const express = require('express');
const router = express.Router();
const { home, contact, addProjectView, detailProject, addProjectPost, deleteProject, editProjectView, editProject, registerPost, loginView, loginPost, registerView, testimonialView, logout, editProjectPost } = require('./controller');

router.get('/', home);
router.get('/home', home);
router.get('/contact', contact);
router.get('/testimonial', testimonialView);
router.get('/project/detail', detailProject);
router.get('/project/delete', deleteProject);
router.get('/project/add', addProjectView);
router.get('/project/edit', editProjectView);
router.get('/login', loginView);
router.get('/register', registerView);
router.post('/project/add', addProjectPost);
router.post('/project/edit', editProjectPost);
router.post('/login', loginPost);
router.post('/register', registerPost);
router.post('/logout', logout);

module.exports = router;
