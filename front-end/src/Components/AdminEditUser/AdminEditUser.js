import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminEditUser.css";

function AdminEditUser() {
  const data = useSelector((state) => {
    return state;
  });
  const [images, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [Default, setDefault] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();

  const initialValue = {
    name: "",
    phone: "",
    email: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (images !== null) {
        formData.append("image", images);
        axios
          .post(`http://localhost:9000/addprofile/${data.data}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.success) {
              axios
                .post("http://localhost:9000/admin/edituser", {
                  name: formValues.name,
                  phone: formValues.phone,
                  email: formValues.email,
                  id: data.data,
                  token: data.token
                })
                .then(function (response) {
                  console.log(response);
                  if (response.data.success) {
                    navigate("/admin/users");
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          });
      } else {
        axios
          .post("http://localhost:9000/admin/edituser", {
            name: formValues.name,
            phone: formValues.phone,
            email: formValues.email,
            id: data.data,
            token: data.token
          })
          .then(function (response) {
            console.log(response);
            if (response.data.success) {
              navigate("/admin/users");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Username is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
      errors.name = "Username should only contain alphabets and space";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (values.phone.length !== 10) {
      console.log(typeof values.phone);
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
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return errors;
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:9000/user", {
        id: data.data,
      })
      .then((res) => {
        setFormValues({
          name: res.data.details.name,
          email: res.data.details.email,
          phone: res.data.details.phone.toString(),
        });
        setDefault(res.data.details.image);
      });
  }, []);
  const url = `http://localhost:9000/image/${Default}`;
  return (
    <div className="signup">
      <div className="signup_main_div">
        <div>
          <h1>Edit User</h1>
        </div>
        <div className="form_div">
          <div className="image">
            <img
              src={images == null ? url : URL.createObjectURL(images)}
              alt=""
            />
            <input
              type="file"
              name="image"
              value=""
              onChange={(event) => {
                const a = event.target.files[0];
                setImage(a);
                console.log(images);
              }}
            />
          </div>
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
            <div className="sbtn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditUser;
