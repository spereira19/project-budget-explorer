import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Alert from "../Alerts/Alert";
import { login } from "../../reactquery/users/userQueries";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

//! Validations
const validSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
});

const Login = () => {
  //const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: login,
    mutationKey: ["Login"],
  })
  const validateValues = useFormik({
    initialValues:{
      email: "",
      password: "",
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
  return (
    <form 
      onSubmit={validateValues.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}
      {isPending && <Alert type="loading" message="Login you in...." />}
      {isError && (
        <Alert type="error" message={error.response.data.message} />
      )}
      {isSuccess && <Alert type="success" message="Login successful" />}

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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default Login;