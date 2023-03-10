import express from "express";
import dotenv from "dotenv";
import pg from "./db/db.js";
import { router } from "./routes/index.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

async function start() {
  try {
    await pg();

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
