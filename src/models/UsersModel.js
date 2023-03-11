import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

export const UsersModel = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING(12),
    unique: true,
  },
  otp_id: {
    type: DataTypes.STRING,
  },
});
