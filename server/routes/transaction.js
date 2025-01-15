import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import transactionController from "../controllers/transactionController.js";

const transactionRouter = express.Router();

//CREATE TRANSACTION i.e. add expenses or add additional budget received
//POST/transactions/create
transactionRouter.post(
  "/transactions/create",
  isAuthenticated,
  transactionController.create
);
//LIST TRANSACTIONS FOR A DATE RANGE
//GET/transactions/listFilteredValues
transactionRouter.get(
  "/transactions/listFilteredValues",
  isAuthenticated,
  transactionController.listFilteredValues
);
//LIST ALL TRANSACTIONS
//GET/transactions/listTransaction
transactionRouter.get(
  "/transactions/listTransaction",
  isAuthenticated,
  transactionController.listTransactions
);
//SEARCH FOR TRANSACTION
//GET/transactions/listTransactions/:id
transactionRouter.get(
  "/transactions/listTransaction/:id",
  isAuthenticated,
  transactionController.listSpecTransactions
);
//UPDATE TRANSACTION
//PUT/transactions/update/:id
transactionRouter.put(
    "/transactions/update/:id",
    isAuthenticated,
    transactionController.update
);
//DELETE TRANSACTION
//DELETE/transactions/delete/:id
transactionRouter.delete(
    "/transactions/delete/:id",
    isAuthenticated,
    transactionController.delete
);
  
export default transactionRouter