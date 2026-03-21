import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

export default User;