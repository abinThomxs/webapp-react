import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    phone: "",
    password: "",
    email: "",
  };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:9000/signup", {
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email,
          password: formValues.password,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.success) {
            navigate("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Username is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
      errors.name = "Username should only contain alphabets and space";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 4) {
      errors.password = "password is should atleast contain 4 characters";
    } else if (values.password.length >= 10) {
      errors.password = "password is should exceed 10 characters";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (values.phone.length !== 10) {
      errors.phone = "Invalid phone number";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (
      !String(values.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  return (
    <div className="signup">
      <div className="signup_mainDiv">
        <div>
          <h1>Signup</h1>
        </div>
        <div className="form_div">
          <form className="sform" onSubmit={handleSubmit}>
            <div className="space">
              <label htmlFor="">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
              />
              <p className="error">{formErrors.name}</p>
            </div>
            <div className="space">
              <label htmlFor="">Phone:</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formValues.phone}
                onChange={handleChange}
              />
              <p className="error">{formErrors.phone}</p>
            </div>
            <div className="space">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="error">{formErrors.email}</p>
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
              <p className="error">{formErrors.password}</p>
            </div>
            <div className="sbtn">
              <button type="submit">Submit</button>
            </div>
          </form>
          <p className="to_signup">
            Alredy have a account?
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
