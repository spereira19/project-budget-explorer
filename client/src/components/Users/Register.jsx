import React, { useEffect } from "react";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../reactquery/users/userQueries";
import Alert from "../Alerts/Alert";
import { useNavigate } from "react-router-dom";

//Validations
const validSchema = Yup.object({
  Name: Yup.string().required("Name is mandatory"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirming your password is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: register,
    mutationKey: ["register"],
  })
  
  const validateValues = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    // Validations
    validSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      //http request
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess]);

  return (
      <form onSubmit={validateValues.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Register
      </h2>
      {/* Display messages */}
      {isPending && <Alert type="loading" message="Logging you to the application.." />}
      {isError && (
        <Alert type="error" message={error.response.data.message} />
      )}
      {isSuccess && <Alert type="success" message="Registration successful" />}

      {/* Input Field - Username */}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="name"
          type="text"
          {...validateValues.getFieldProps("name")}
          placeholder="Full name"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {validateValues.touched.name && validateValues.errors.name && (
          <span className="text-xs text-red-500">{validateValues.errors.name}</span>
        )} 
      </div>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...validateValues.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {validateValues.touched.email && validateValues.errors.email && (
          <span className="text-xs text-red-500">{validateValues.errors.email}</span>
        )} 
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...validateValues.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {validateValues.touched.password && validateValues.errors.password && (
          <span className="text-xs text-red-500">{validateValues.errors.password}</span>
        )}
      </div>

      {/* Input Field - Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="confirmPassword"
          type="password"
          {...validateValues.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {validateValues.touched.confirmPassword && validateValues.errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {validateValues.errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Register
      </button>
    </form>
  );
};

export default Register;