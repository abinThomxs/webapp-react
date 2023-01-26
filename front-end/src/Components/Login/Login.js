import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./Login.css";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => {
    return state;
  });
  const initialValue = {
    password: "",
    email: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login", {
        email: formValues.email,
        password: formValues.password,
      })
      .then(function (response) {
        if (response.data.auth === true) {
          console.log(response);
          dispatch({
            type: "StoreToken",
            token: response.data.token,
            id: response.data.id,
            accountType: response.data.accountType,
          });
          if (response.data.accountType === "user") {
            navigate("/home");
          } else if (response.data.accountType === "admin") {
            navigate("/admin/home");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username and password",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (auth !== undefined) {
      if (auth.token !== "") {
        if (auth.accountType === "user") {
          navigate("/home");
        } else if (auth.accountType === "admin") {
          navigate("/admin/home");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="signup">
      <div className="signup_main_div">
        <div>
          <h1 className="loginhead">Login</h1>
        </div>
        <div className="form_div">
          <form className="sform" onSubmit={handleSubmit}>
            <div className="space">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="space">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <div className="sbtn">
              <button type="submit">Login</button>
            </div>
          </form>
          <p className="to_signup">
            Don't have a account?
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
