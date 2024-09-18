const express = require('express');
const path = require('path');
const session = require("express-session");
const flash = require('express-flash');
const hbs = require('hbs');


module.exports = (app) => {

  app.use('/assets', express.static(path.join(__dirname, '..','assets')));
  app.use('/temp', express.static(path.join(__dirname, '..','temp')));

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'assets' ,'views'));
  hbs.registerPartials(path.join(__dirname, '..','assets', 'views', 'partials'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(flash());

  app.use(
    session({
      name: "user-session",
      secret: "ewVsqWOyeb",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 hari
      },
    })
  );

  hbs.registerHelper('not', function(value) {
    return !value;
  });

  hbs.registerHelper('includes', function(array, value) {
    return array.includes(value);
  });
  hbs.registerHelper('techIncludes', function(array, value) {
    return array && array.includes(value);
  });
};
