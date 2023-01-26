import React, { useEffect } from "react";
import "./AdminNav.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminSideNav() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      type: "RemoveToken",
    });
    navigate("/");
  };
  const auth = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    if (auth === undefined) {
      navigate("/");
    } else {
      if (auth.token === "" || auth.accountType !== "admin") {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="nav">
      <div className="brand">
        <h2>WooFF!</h2>
      </div>
      <div className="nav_menu">
        <div
          onClick={() => {
            navigate("/admin/home");
          }}
        >
          Home
        </div>
        <div onClick={() => {
          navigate("/admin/users")
        }
        }>Users</div>
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}

export default AdminSideNav;
