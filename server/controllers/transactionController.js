import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
import User from "../models/user.js";
import Project from "../models/Project.js";

const transactionController = {

    //CREATE TRANSACTION
    create: asyncHandler(async (req, res) => {
      console.log("In create transaction")
      const { type, category, amount, date, description, project } = req.body;
      if (!amount || !type || !date ||!project) {
        throw new Error("Type, amount and date are required");
      }
      console.log(req.body);
      //1. Find user
      const userFound = await User.findById(req.user);
      if (!userFound) {
        throw new Error("User doesn't exist in the database");
      }
      //2. Find the project for which transaction needs to be added
      const projectFound = await Project.findById(project);
      if (!projectFound) {
        throw new Error("Project not found. No expenses can be added");
      }
      //3. Create the transaction
      const transaction = await Transaction.create({
        category,
        type,
        amount,
        description,
        date,
        createdBy: req.user,
        project,
      });
      //4. Push the transaction to the Project
      console.log(projectFound)
      projectFound.transactions.push(transaction._id);
      //5. Resave the project
      await projectFound.save();
      res.status(201).json(transaction);
    }),
    

    //LIST TRANSACTIONS FOR A DATE RANGE
    listFilteredValues: asyncHandler(async (req, res) => {
      const { startDate, endDate, type, category, project } = req.query;
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      console.log(req)
      console.log(req.user)
      console.log(project)
      console.log(parsedEndDate)
      if (category) {
        const query = {
            date: {
                $gte: parsedStartDate, 
                $lte: parsedEndDate 
            },
            createdBy: req.user,
            project: project,
            category: category
          }
        // Find documents within the date range for a category
        const documents = await Transaction.find(query);

        //console.log(documents)
        res.json(documents);    
      }
      else {
        const query = {
          date: {
              $gte: parsedStartDate, 
              $lte: parsedEndDate 
          },
          createdBy: req.user,
          project: project
        }
        // Find documents within the date range
        const documents = await Transaction.find(query);
        console.log(documents)
        //console.log(documents)
        res.json(documents);  
      };
    }),

    //LIST ALL TRANSACTIONS
    listTransactions: asyncHandler(async (req, res) => {
      console.log("listtransactions")      
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    }),

    //LIST SPECIFIC TRANSACTIONS
    listSpecTransactions: asyncHandler(async (req, res) => {
      //1. Find the id from params
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      const transaction = await Transaction.findById(id);
      res.status(200).json(transaction);
    }),

    // UPDATE TRANSACTION DETAILS
    update: asyncHandler(async (req, res) => {
    //1. Find the id from params
    const { id } = req.params;
    console.log(req.body)
    // Add check to see if user trying to update field is the one who created it
    const project = await Transaction.findByIdAndUpdate(
          id, req.body,
          {
            new: true,              
            runValidators: true,
          });
      
      res.json({ message: "Transaction details updated successfully" });
      res.status(200)
    }),

    // DELETE PROJECT
    delete: asyncHandler(async (req, res) => {
      //1. Find the id from params
      const { id } = req.params;
      const transaction = await Transaction.findByIdAndDelete(id);
      res.json({ message: "Transaction details deleted successfully" });
    }) 
  };
 
export default  transactionController;