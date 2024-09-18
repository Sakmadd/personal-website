const express = require('express');
const path = require('path');
const session = require("express-session");
const flash = require('express-flash');
const hbs = require('hbs');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');


module.exports = (app) => {

  app.use('/assets', express.static(path.join(__dirname, '..','assets')));

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'assets' ,'views'));
  hbs.registerPartials(path.join(__dirname, '..','assets', 'views', 'partials'));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(flash());

  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
       },
       secret: 'a santa at nasa',
       resave: true,
       saveUninitialized: true,
       store: new PrismaSessionStore(
         new PrismaClient(),
         {
           checkPeriod: 2 * 60 * 1000,  
           dbRecordIdIsSessionId: true,
           dbRecordIdFunction: undefined,
         }
       )
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
