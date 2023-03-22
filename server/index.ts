import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const routes = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const cors = require("cors");

const app: Express = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes());

const host = "0.0.0.0" || process.env.HOST;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server up on ", port);
});
