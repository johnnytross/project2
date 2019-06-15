module.exports = function (sequelize, DataTypes) {
  var Voyager = sequelize.define("Voyager", {
    astronaut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    space_craft: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1,50]
    },
    planet: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1,50]
    },
    return_trip: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });



  return Voyager;
};


