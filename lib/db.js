import { Sequelize } from "sequelize";

const sequelize = new Sequelize("library_db", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;