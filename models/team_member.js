module.exports = function (sequelize, DataTypes) {
  let TeamMember = sequelize.define("TeamMember", {
    nick_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    auth0_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // team_id: {
    //   type: DataTypes.INT,
    //   allowNull: false
    // },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  TeamMember.associate = function (models) {
    TeamMember.belongsTo(models.Team);
    TeamMember.hasMany(models.Answer);
  };

  return TeamMember;
};