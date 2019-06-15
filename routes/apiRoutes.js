var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/voyager", function (req, res) {
    db.Voyager.findAll({}).then(function (dbVoyager) {
      res.json(dbVoyager);
    });
  });

  // Create a new example
  app.post("/api/voyager", function (req, res) {
    console.log('post voyage')
    db.Voyager.create(req.body).then(function (dbVoyager) {
      console.log("posted")
      // console.log(dbVoyager)
      // res.json(dbVoyager);
      res.redirect('/allvoyages')
    });
  });

  // Delete an example by id
  app.delete("/api/voyager/:id", function (req, res) {
    db.Voyager.destroy({ where: { id: req.params.id } }).then(function (dbVoyager) {
      res.json(dbVoyager);
    });
  });
};
