import asyncHandler from "express-async-handler";
import Category from "../models/Category.js"


const categoryController = {
  //ADD A NEW CATEGORY
  create: asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("Enter a category name");
    }
    //>1 Convert the category name to lowercase
    const normalizedName = name.toLowerCase();

    //>2 Check if category already exists in the project
    const categoryExists = await Category.findOne({
      name: normalizedName,
    });
    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }
    const category = await Category.create({
      name: normalizedName,
    });
    res.status(201).json(category);
  }),

  //LIST ALL CATEGORIES
  listCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
  })
  /*
  //!Edit category name
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    const oldName = category.name;
    //! Update category properties
    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    //Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),


  //! delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      //!  Update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category.name },
        { $set: { category: defaultCategory } }
      );
      //! Remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transactions updated" });
    } else {
      res.json({ message: "Category not found or user not authorized" });
    }
  }),*/
};

export default categoryController;