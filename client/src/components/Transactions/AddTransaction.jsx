import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    FaDollarSign,
    FaCalendarAlt,
    FaRegCommentDots,
    FaWallet,
  } from "react-icons/fa";import { useDispatch } from "react-redux";
//import { useTranslation } from 'react-i18next';
import Alert from "../Alerts/Alert";
import { addTransaction } from "../../reactquery/transactions/transactionQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { listProjects } from "../../reactquery/projects/projectQueries";
//! Validations
const validSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const AddTransaction = () => {
  //const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Mutation
  const {
    mutateAsync,
    isPending,
    isError: isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn: addTransaction,
    mutationKey: ["add-transaction"],
  });
  //fetching
  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listProjects,
    queryKey: ["list-projects"],
  });

  console.log(data);
  const validateValues = useFormik({
    initialValues:{
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
      project:""
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
        dispatch(loginAction(data));
        //Save the user into localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
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
          Add New Transaction
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
          message="Transaction successfully added."
        />
      )}

      {/* Project name */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Project name</span>
        </label>
        <select
          {...validateValues.getFieldProps("project")}
          id="project"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select project</option>
          {data?.map((project) => {
            return (
              <option key={project?._id} value={project?._id}>
                {project?.name}
              </option>
            );
          })}
        </select>
        {validateValues.touched.type && validateValues.errors.type && (
          <p className="text-red-500 text-xs">{validateValues.errors.type}</p>
        )}
      </div>

      {/* Transaction Type Field */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...validateValues.getFieldProps("type")}
          id="type"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select transaction type</option>
          <option value="expense">Expense</option>
          <option value="budget">Additional budget</option>
        </select>
        {validateValues.touched.type && validateValues.errors.type && (
          <p className="text-red-500 text-xs">{validateValues.errors.type}</p>
        )}
      </div>

      {/* Category name */}
      <div className="space-y-2">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Category</span>
        </label>
        <select
          {...validateValues.getFieldProps("category")}
          id="name"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select category</option>
          <option value="licensing cost">Licensing cost</option>
          <option value="consultancy cost">Consultancy cost</option>
          <option value="travel cost">travel cost</option>
          <option value="operational cost">operational cost</option>
        </select>
        {validateValues.touched.type && validateValues.errors.type && (
          <p className="text-red-500 text-xs">{validateValues.errors.type}</p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Amount</span>
        </label>
        <input
          type="number"
          {...validateValues.getFieldProps("amount")}
          placeholder="Amount"
          id="amount"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.amount && validateValues.errors.amount && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.amount}</p>
        )}
      </div>
      
      {/* Start Date */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Date</span>
        </label>
        <input
          type="date"
          {...validateValues.getFieldProps("date")}
          placeholder="yyyy-mm-dd"
          id="date"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.date && validateValues.errors.date && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.date}</p>
        )}
      </div>
        {/* Description Field */}
        <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Description (optional)</span>
        </label>
        <textarea
          {...validateValues.getFieldProps("description")}
          id="description"
          placeholder="Description"
          rows="3"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {validateValues.touched.description && validateValues.errors.description && (
          <p className="text-red-500 text-xs italic">
            {validateValues.errors.description}
          </p>
        )}
      </div>

      
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Add transaction
      </button>
    </form>
  );
};


export default AddTransaction;