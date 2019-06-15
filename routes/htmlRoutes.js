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
    db.Voyager.findAll({}).then(function (dbVoyager) {
      console.log(dbVoyager)
      res.render("example", {
        msg: "Welcome!",
        voyager: dbVoyager
      });
    });
  });

  //html route to the form page
  app.get("/form", function (req, res) {
    res.render("voyagerform");
  });

  app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/tables.html"));
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
