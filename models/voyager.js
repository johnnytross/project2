module.exports = function (sequelize, DataTypes) {
  var Voyager = sequelize.define("Voyager", {
    astronaut: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    spacecraft: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    planet: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    return_trip: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });



  return Voyager;
};


