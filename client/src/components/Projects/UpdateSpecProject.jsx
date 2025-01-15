import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaWallet,
} from "react-icons/fa";


//import { useTranslation } from 'react-i18next';
import Alert from "../Alerts/Alert";
import { listSpecProject , updateProject} from "../../reactquery/projects/projectQueries";
import { useNavigate, useParams } from "react-router-dom";

const validSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
});

const UpdateCategory = () => {
  //Params
  const { id } = useParams();
  console.log(id);
  //Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProject,
    mutationKey: ["update-project"],
  });

  const validateValues = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        id,
      };
      mutateAsync(data)
        .then((data) => {
          //redirect
          navigate("/listProjects");
        })
        .catch((e) => console.log(e));
    },
  });


  return (
    <form
      onSubmit={validateValues.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Update Project
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
          message="Project successfully updated."
        />
      )}
      {/* Name */}
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
          id="name"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.name}</p>
        )}
      </div>

      {/* Budget Allocated */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Budget allocated</span>
        </label>
        <input
          type="number"
          {...validateValues.getFieldProps("budgetAllocated")}
          placeholder="Amount"
          id="budgetAllocated"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.name}</p>
        )}
      </div>
      
      {/* Start Date */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>Start date</span>
        </label>
        <input
          type="date"
          {...validateValues.getFieldProps("startDate")}
          placeholder="yyyy-mm-dd"
          id="startDate"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.name}</p>
        )}
      </div>

      {/* End date */}
      <div className="space-y-2">
        <label
          htmlFor="Type"
          className="flex gap-2 items-center text-gray-700 font-medium"
        >
          <FaWallet className="text-blue-500" />
          <span>End date</span>
        </label>
        <input
          type="date"
          {...validateValues.getFieldProps("endDate")}
          placeholder="yyyy-mm-dd"
          id="endDate"
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <p className="text-red-500 text-xs italic">{validateValues.errors.name}</p>
        )}             
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Update
      </button>

    </form>
  );
};

export default UpdateCategory;