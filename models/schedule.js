const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.STRING(15), //DATE형식으로 나중에 바꾸기
          allowNull: false,
        },
        time: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        grade: {
          type: Sequelize.TINYINT(4),
          allowNull: true,
          defaultValue: 0,
        },
        state: {
          type: Sequelize.ENUM("official", "public"),
          allowNull: false,
          defaultValue: "official",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Schedule",
        tableName: "schedules",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
