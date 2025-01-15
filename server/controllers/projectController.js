import asyncHandler from "express-async-handler";
import Project from "../models/Project.js";
import User from "../models/user.js";

const projectController = {
  // CREATE NEW PROJECT
  create: asyncHandler(async (req, res) => {
    const { name , budgetAllocated , endDate, startDate} = req.body;
    console.log(req.body);
    if (!name) {
      throw new Error("Enter a project name");
    }
    //>1 Convert project name to lowercase
    const normalizedName = name.toLowerCase();

    //>2 Check if project already exists
    const projectExists = await Project.findOne({
      name: normalizedName,
    });
    if (projectExists) {
      throw new Error(
        `Project ${projectExists.name} already exists in the database`
      );
    }
    console.log(req.user)
    //>3 Check if user exists in database
    const userFound = await User.findById(req.user);
    if (!userFound) {
      throw new Error(
        `User ${userFound.name} does not exist in the database`
      );
     
    }  

    //>4 Create the entry in the database
    const project = await Project.create({
      name: normalizedName,
      createdBy: req.user,
      budgetAllocated: budgetAllocated,
      startDate:startDate,
      endDate: endDate
    });
    //5. Add the project details to the user
     userFound.projects.push(project._id);
     await userFound.save();
    //res.status(201).json(project);

    res.json({
      name: normalizedName,
      createdBy: req.user,
      budgetAllocated: budgetAllocated,
      endDate: endDate,
      id: project._id,
    });
  }),

  //LIST ALL PROJECTS
  listProjects: asyncHandler(async (req, res) => {
    console.log("listProjects")
    console.log(req.user)
    const projects = await Project.find({createdBy: req.user});
    res.status(200).json(projects);
  }),
  //LIST ALL PROJECTS
  listProjects1: asyncHandler(async (req, res) => {
    console.log("listProjects")
    const projects = await Project.find();
    res.status(200).json(projects);
  }),
  //LIST SPECIFIC PROJECT
  listSpecProject: asyncHandler(async (req, res) => {
    //1. Find the id from params
    console.log('In List specific project')
    console.log(req.params)
    const { id } = req.params;
    console.log(id)
    const project = await Project.findById(id).populate("transactions");
    res.status(200).json(project);
  }),
  // UPDATE PROJECT DETAILS
  updateProject: asyncHandler(async (req, res) => {
    //1. Find the id from params
    const { id } = req.params;
    console.log(req.body)
    
    const project = await Project.findByIdAndUpdate(
          id, req.body,
          {
            new: true,
            runValidators: true,
          });
    
    res.json({ message: "Project details updated successfully" });
    res.status(200)
  }),
  // DELETE PROJECT
  deleteProject: asyncHandler(async (req, res) => {
    //1. Find the id from params
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    res.json({ message: "Project details deleted successfully" });
    res.status(200).json(project);
  })
};

export default projectController;