module.exports = function(sequelize, DataTypes) {
  let Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Team;
};