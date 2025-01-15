import axios from "axios";
import { API_URL } from "../../utils/apiURL";

//import { getUserFromStorage } from "../../utils/getUserFromStorage";
//! Get the token
//const token = getUserFromStorage();

//! Login
export const login = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });
  //Return a promise
  console.log(response.data)
  return response.data;
};

//! register
export const register = async ({ email, password, name }) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    email,
    password,
    name,
  });
  //Return a promise
  console.log(response.data)
  return response.data;
};
/*
//! update Profile
export const updateProfile = async ({ email, username }) => {
  const response = await axios.put(
    `${API_URL}/users/updateProfile`,
    {
      email,
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );
  //Return a promise
  return response.data;

};

*/