import axios from "axios";
import { API_URL } from "../../utils/apiURL";
import { getLocalStorageUserdetails } from "../../utils/getLocalStorageUserdetails";

//! Get the token
const token = getLocalStorageUserdetails();
//! Add
export const addTransaction = async ({
  type,
  category,
  date,
  description,
  amount,
  project
}) => {
  const response = await axios.post(
    `${API_URL}/transactions/create`,
    {
      category,
      date,
      description,
      amount,
      type,
      project
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
//! update
export const updateCategory = async ({ name, type, id }) => {
  const response = await axios.put(
    `${API_URL}/categories/update/${id}`,
    {
      name,
      type,
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
//! delete
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
//! lists
export const listTransactions = async ({
  startDate,
  endDate,
  project,
  type,
}) => {
  const response = await axios.get(`${API_URL}/transactions/listFilteredValues`, {
    params: { startDate, endDate, project },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};