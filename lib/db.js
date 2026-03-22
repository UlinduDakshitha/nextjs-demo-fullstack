import { Sequelize } from "sequelize";


const sequelize = new Sequelize("library_db", "root", "Ulindu@123", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;