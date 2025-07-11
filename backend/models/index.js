const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  },
);

// Dynamically load all models
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    const modelFile = require(path.join(__dirname, file));

    // Handle both function exports and class exports
    let model;
    if (typeof modelFile === "function") {
      model = modelFile(sequelize, Sequelize.DataTypes);
    } else if (modelFile.default && typeof modelFile.default === "function") {
      model = modelFile.default(sequelize, Sequelize.DataTypes);
    } else {
      console.error(`Invalid model export in ${file}`);
      return;
    }

    db[model.name] = model;
  });

// Run associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
