var db = require("../models");

module.exports = function (app) {
  // Get all voyager entries
  app.get("/api/voyager", function (req, res) {
    db.Voyager.findAll({}).then(function (dbVoyager) {
      res.json(dbVoyager);
    });
  });

  // Create a new voyager trip
  app.post("/api/voyager", function (req, res) {
    console.log('post voyage')
    db.Voyager.create(req.body).then(function (dbVoyager) {
      console.log("posted")
      // console.log(dbVoyager)
      // res.json(dbVoyager);
      res.redirect('/allvoyages')
    });
  });

  // Delete an voyage by id
  app.delete("/api/voyager/:id", function (req, res) {
    db.Voyager.destroy({ where: { id: req.params.id } }).then(function (dbVoyager) {
      res.json(dbVoyager);
    });
  });
};
