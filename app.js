"use strict";

// imports
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import db from "./models/index.js";
import mainRouter from "./routes/index.js";

// fichiers d'environnements
const { PORT, NODE_ENV } = process.env;

db.sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// WEB API
//init
const app = express();

//middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("short"));

//routing
app.use("/api", mainRouter);

//demarrage serveur
app.listen(PORT, () => {
  console.log(`Web API is running on ${PORT} (${NODE_ENV})`);
});
