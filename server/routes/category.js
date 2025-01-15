import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import categoryController from "../controllers/categoryController.js";

const categoryRouter = express.Router();

//ADD CATEGORY
//POST/category/create
categoryRouter.post(
  "/category/create",
  isAuthenticated,
  categoryController.create
);

//LIST ALL CATEGORIES
//POST/category/listCategories
categoryRouter.get(
  "/category/listCategories",
  isAuthenticated,
  categoryController.listCategories
);
/*
//! update
categoryRouter.put(
  "/category/update/:categoryId",
  isAuthenticated,
  categoryController.update
);
//! delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryController.delete
);*/

export default categoryRouter
