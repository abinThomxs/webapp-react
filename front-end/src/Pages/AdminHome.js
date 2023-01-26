import React from "react";
import AdminHomeComponent from "../Components/AdminHomeComponents/AdminHomeComponents";
import AdminNav from "../Components/AdminNav/AdminNav";

function AdminHome() {
  return (
    <div>
      <AdminNav />
      <AdminHomeComponent />
    </div>
  );
}

export default AdminHome;
