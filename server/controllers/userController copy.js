import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//REGISTER
const userController = {
  register: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    //>1 check if email exist
    if (!name || !email || !password) {
      throw new Error("Enter all mandatory fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    //>2 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    //res.json({ message:"Register"})
    res.json({
      name: userCreated.name,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //LOGIN
  login: asyncHandler(async (req, res) => {
    console.log("In login");
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //>1 Check if email exists
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }
    //>2 Check if password matches the password for user stored in the database
    console.log(password)
    console.log(typeof(password))    
    //
    // const pass = bcrypt.hash(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      console.log("Invalid password");
      throw new Error("Invalid login credentials");
    }
    //>3 Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    //>4 Send the response
    res.json({
      message: "Login Successful",
      token,
      id: user._id,
      email: user.email,
      name: user.name,
    });
  }),

  //PROFILE
  profile: asyncHandler(async (req, res) => {
    //>1 Check if the user exists‚
    console.log(req.user);
    const user = await User.findById(req.user).populate({
      path: "projects",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    //Send the response
    res.json(user);
  }),

  //UPDATE PASSWORD
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //! Find the user
    
    const user = await User.findById(req.user);
    console.log("user details are %o",user)
    if (!user) {
      throw new Error("User not found");
    }
    //! Hash the new password before saving
    //!Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    //! ReSave
    await user.save({
      validateBeforeSave: false,
    });
    //!Send the response
    res.json({ message: "Password Changed successfully" });
  }),
  //UPDATE USER DETAILS
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        name: name,
        email: email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

export default userController;
