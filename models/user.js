const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nick: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        // en_year: {
        //   type: Sequelize.INTEGER.UNSIGNED,
        //   allowNull: false,
        // },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        role: {
          type: Sequelize.TINYINT(3),
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.JgBoard);
  }
};
