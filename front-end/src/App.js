import "./App.css";
import React from "react";
import Signup from "./Pages/Signup";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AdminHome from "./Pages/AdminHome";
import AdminUsersPage from "./Pages/AdminUsersPage";
import AdminAddUserPage from "./Pages/AdminAddUserPage";
import AdminEditUserPage from "./Pages/AdminEditUserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/admin/home" exact element={<AdminHome />} />
          <Route path="/admin/users" exact element={<AdminUsersPage />} />
          <Route path="/admin/users/add" exact element={<AdminAddUserPage />} />
          <Route path="/admin/users/edit" exact element={<AdminEditUserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
