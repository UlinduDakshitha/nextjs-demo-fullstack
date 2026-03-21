import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Book = sequelize.define("Book", {
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Book;