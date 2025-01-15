import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage"
import './App.css'
import Public from "./components/Navigation/Public";
import Private from "./components/Navigation/Private";
import AddCategory from "./components/Categories/AddCategories";
import AddProject from "./components/Projects/AddProject";
import ListProject from "./components/Projects/ListProject";
import UpdateSpecProject from "./components/Projects/UpdateSpecProject";
import AddTransaction from "./components/Transactions/AddTransaction"
import Visualisation from "./components/Users/Visualisation";

import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

import { getLocalStorageUserdetails } from "./utils/getLocalStorageUserdetails";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=>state?.auth?.user)
  console.log(user);
  console.log("value of token")
  console.log(getLocalStorageUserdetails);
  return (
    <BrowserRouter>
      {user? <Private/>:<Public/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/addProject" element={<AddProject />} />
        <Route path="/listProjects" element={<ListProject />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/updateProjects/:id" element={<UpdateSpecProject />} />
        <Route path="/visualisation" element={<Visualisation />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
