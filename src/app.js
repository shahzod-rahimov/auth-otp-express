import express from "express";
import dotenv from "dotenv";
import pg from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

async function start() {
  try {
    await pg();

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
