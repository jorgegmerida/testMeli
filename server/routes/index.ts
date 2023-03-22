import express, { Express } from "express";
const router = express.Router();
const itemsController = require("../controllers/itemsController");

module.exports = () => {
  router.get("/api/items?:q", itemsController.itemsQuery);
  router.get("/api/items/:id", itemsController.itemId);
  return router;
};
