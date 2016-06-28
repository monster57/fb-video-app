"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    display_name: DataTypes.STRING,
    facebook_id:DataTypes.STRING,
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