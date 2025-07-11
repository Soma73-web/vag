const db = require("./models");

console.log(
  "Available models:",
  Object.keys(db).filter((k) => k !== "sequelize" && k !== "Sequelize"),
);
console.log("Sequelize instance:", !!db.sequelize);
console.log("Test completed successfully");
process.exit(0);
