"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    display_name: DataTypes.STRING,
    username:DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    profile_image: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};