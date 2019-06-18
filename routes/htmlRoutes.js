var db = require("../models");

module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
    //sequelize findAll to select * from DB
    db.Voyager.findAll({}).then(function (dbVoyager) {
      console.log(dbVoyager)
      res.render("index", {
        msg: "Welcome!",
        voyager: dbVoyager
      });
    });
  });

  app.get("/allvoyages", function (req, res) {
    console.log('all voyages')
    //sequelize findAll to select * from DB
    db.Voyager.findAll({ order: [['createdAt', 'DESC']], limit: 10 }).then(function (dbVoyager) {
      console.log(dbVoyager)
      res.render("voyager", {
        msg: "Welcome!",
        voyager: dbVoyager
      });
    });
  });

  //html route to the form page
  app.get("/form", function (req, res) {
    res.render("voyagerform");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
