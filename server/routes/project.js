import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import projectController from "../controllers/projectController.js";

const projectRouter = express.Router();

//CREATE NEW PROJECT
//POST/projects/create
projectRouter.post(
  "/projects/create",
  isAuthenticated,
  projectController.create
);

//LIST ALL PROJECTS
//GET/projects/listProjects
projectRouter.get(
  "/projects/listProjects",
  isAuthenticated,
  projectController.listProjects
);
//LIST SPECIFIC PROJECT
//GET/projects/listProjects/:id
projectRouter.get(
  "/projects/listProjects/:id",
  isAuthenticated,
  projectController.listSpecProject
);
//UPDATE PROJECT DETAILS
//PUT/projects/update/:id
projectRouter.put(
  "/projects/update/:id",
  isAuthenticated,
  projectController.updateProject
);
//DELETE PROJECT DETAILS
//DELETE/projects/delete/:id
projectRouter.delete(
  "/projects/delete/:id",
  isAuthenticated,
  projectController.deleteProject
);/**/

export default projectRouter
