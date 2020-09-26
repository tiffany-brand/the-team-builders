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

  Team.associate = function(models) {
    Team.hasMany(models.TeamMember, {
      onDelete: "SET NULL"
    });
  };

  return Team;
};