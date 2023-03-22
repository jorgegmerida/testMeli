import express, { Express, Request, Response } from "express";
const router = express.Router();
const itemsController = require("../controllers/itemsController");

module.exports = () => {
  router.get("/api/items?:q", itemsController.itemsQuery);
  return router;
};
