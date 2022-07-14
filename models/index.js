const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const JgBoard = require("./board_jg");
const Schedule = require("./schedule");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.JgBoard = JgBoard;
db.User = User;
db.Schedule = Schedule;
User.init(sequelize);
Schedule.init(sequelize);
JgBoard.init(sequelize);

User.associate(db);
Schedule.associate(db);
JgBoard.associate(db);

module.exports = db;
