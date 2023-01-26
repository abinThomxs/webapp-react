import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminAddUser() {
    const auth = useSelector((state) => {
        return state;
    });
    const navigate = useNavigate();
    const initialValue = {
        name: "",
        phone: "",
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
            .post("http://localhost:9000/admin/adduser", {
                name: formValues.name,
                phone: formValues.phone,
                email: formValues.email,
                password: formValues.password,
                token: auth.token,
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
    };
    return (
        <div className="signup">
            <div className="signup_main_div">
                <div>
                    <h1>Add User</h1>
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
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminAddUser