require("dotenv").config();
const express = require("express");
const next = require('./nextapp');
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const database = require("./config/database");
const helmet = require("helmet");
const passport = require("passport");

//Is Dev ENV ?
const dev = process.env.NODE_ENV !== 'production'

//Start Next App Localized on ./nextApp Folder
const app = next({ dev, dir: './nextapp' })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // Boot Express Application
  const server = new express();
  server.listen(process.env.PORT);
  console.log(`Server Started at PORT ${process.env.PORT}`);
  
  //Register Middlewares
  //bodyParser => Parse incoming request bodies in a middleware before
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  //secure express apps by setting various HTTP headers
  server.use(helmet());
  // Passport middleware (authenticate endpoints using a JSON web token) => use of Jwt strategy
  server.use(passport.initialize());
  require("./config/passport")(passport);

  // Register api Routes
  server.use("/api", routes);

  // NextJs handle others routes
  server.all('*', (req, res) => {
    return handle(req, res)
  });

  // connect to database (Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server)
  require("./database/models").sequelize.sync().catch(err => console.log);
  
});