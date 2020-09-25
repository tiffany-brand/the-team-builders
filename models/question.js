module.exports = function(sequelize, DataTypes) {
  let Question = sequelize.define("Question", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Question;
};