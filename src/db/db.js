import { Sequelize } from "sequelize";
import dotEnv from "dotenv";
import UsersModel from "../models/UsersModel.js";
import OTPModel from "../models/OTPModel.js";

dotEnv.config();

// assign postgres url from env file
const DB_URL = process.env.DB_URL;

if (!DB_URL) throw new Error("PG CONNECTION STRING IS NOT FOUND!");

// connect postgres with sequelize orm
const sequelize = new Sequelize(DB_URL, {
  logging: false,
});

export default async function pg() {
  try {
    await sequelize.authenticate();

    // create database object
    let db = {};
    db.users = await UsersModel(sequelize, Sequelize);
    db.otp = await OTPModel(sequelize, Sequelize);

    // await Relations(db);

    // connect
    await sequelize.sync({ force: false });

    return db;
  } catch (e) {
    console.log("SQL_ERROR:", e);
  }
}
