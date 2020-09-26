module.exports = function(sequelize, DataTypes) {
  let Answer = sequelize.define("Answer", {
    // member_id: {
    //   type: DataTypes.INT,
    //   allowNull: false     
    // },
    // question_id: {
    //   type: DataTypes.INT,
    //   allowNull: false
    // },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.TeamMember);
  };
  return Answer;
};