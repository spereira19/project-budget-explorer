import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    FaWallet,
  } from "react-icons/fa";import { useDispatch } from "react-redux";
//import { useTranslation } from 'react-i18next';
import Alert from "../Alerts/Alert";
import { addCategory } from "../../reactquery/categories/categoryQueries";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//! Validations
const validSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
});

const AddCategory = () => {
  //const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategory,
    mutationKey: ["Login"],
  })
  const validateValues = useFormik({
    initialValues:{
      name: ""
    },
    // Validate the data fields
    validSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      // Make the request
      mutateAsync(values)
      .then((data) => {
        //dispatch
        navigate("/profile");
      })
      .catch((e) => console.log(e));
  },
});
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess]);

  return (
    <form
      onSubmit={validateValues.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Category
        </h2>
      </div>
      {/* Display alert message */}
      {isError && (
        <Alert
          type="error"
          message={
            error?.response?.data?.message ||
            "Error"
          }
        />
      )}
      {isSuccess && (
        <Alert
          type="success"
          message="Category added successfully."
        />
      )}

      {/* Category Name */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Name</span>
        </label>
        <input
          type="text"
          {...validateValues.getFieldProps("name")}
          placeholder="Name"
          id="name"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Add a category
      </button>
    </form>
  );
};

export default AddCategory;