import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

export const OTPModel = sequelize.define("otps", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  otp: {
    type: DataTypes.STRING,
  },
  expiration_time: {
    type: DataTypes.DATE,
    unique: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
