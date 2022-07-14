const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        status: {
          type: Sequelize.TINYINT(4),
          allowNull: true,
          defaultValue: 0,
        },
        onSale: {
          type: Sequelize.ENUM("onsale", "notsale", "sold"),
          allowNull: false,
          defaultValue: "onsale",
        },
        money: {
          type: Sequelize.JSON(),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "JgBoard",
        tableName: "jgBoards",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.JgBoard.belongsTo(db.User);
  }
};
