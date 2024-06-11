"use strict";

// imports
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import morgan from "morgan";

// fichiers d'environnements
const { PORT, NODE_ENV } = process.env;

// WEB API
//init
const app = express();

//middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("short"));

//routing

// demarrage serveur
app.listen(PORT, () => {
  console.log(`Web API is running on ${PORT} (${NODE_ENV})`);
});
