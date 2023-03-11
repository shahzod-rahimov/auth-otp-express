import express from "express";
import dotenv from "dotenv";
import pg from "./db/db.js";
import { router } from "./routes/index.routes.js";
import errorHandler from "./middlewares/ErrorHandlingMiddleware.js";
import sequelize from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(errorHandler);

async function start() {
  try {
    sequelize.authenticate();
    sequelize.sync();
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
