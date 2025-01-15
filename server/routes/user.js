import express from 'express';
import userController from "../controllers/userController.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';

const userRouter = express.Router();

//REGISTER
//POST/users/register
userRouter.post("/users/register", userController.register);

//LOGIN
//POST/users/login
userRouter.post("/users/login", userController.login);

//PROFILE
//GET/users/profile
userRouter.get(
   "/users/profile",
   isAuthenticated,
   userController.profile
);

//UPDATE PASSWORD
//PUT/users/updatePassword
userRouter.put(
    "/users/updatePassword",
    isAuthenticated,
    userController.changeUserPassword
);

//UPDATE USER DETAILS
//PUT/users/updateProfile
userRouter.put(
    "/users/updateProfile",
    isAuthenticated,
    userController.updateUserProfile
);

export default userRouter