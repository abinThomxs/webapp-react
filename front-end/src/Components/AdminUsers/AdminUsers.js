import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUsers.css";

function AdminUsers() {
  const auth = useSelector((state) => {
    return state;
  });
  const [search, setsearch] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post("http://localhost:9000/allusers", {
      token: auth.token
    }).then((res) => {
      if (res.data.success) {
        setUsers(res.data.users);
      }
      setSuccess(false);
    });
  }, [success, auth]);

  const handleChange = (event) => {
    setsearch(event.target.value);
    if (event.target.value !== "") {
      const newPacientes = users.filter((value) =>
        value.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      console.log(newPacientes);
      setFilteredDocs(newPacientes);
    }
  };

  return (
    <div className="users">
      <div className="table_div">
        <h1 className="userDetails">User Details</h1>
        <div className="user_options">
          <div className="add_user" onClick={() => {
            navigate("/admin/users/add")
          }}>Add User</div>
          <div className="search_div">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </div>
        </div>

        <table className="user_table" border={1 | 0}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th colSpan={2}>Options</th>
            </tr>
          </thead>
          <tbody>
            {search === "" &&
              users.map((doc) => {
                return (
                  <tr key={doc._id}>
                    <td>
                      <img
                        src={
                          doc.image == null
                            ? ""
                            : `http://localhost:9000/image/${doc.image}`
                        }
                        alt="No profile"
                      />
                    </td>
                    <td>{doc.name}</td>
                    <td>{doc.phone}</td>
                    <td>{doc.email}</td>
                    <td>
                      <div className="edopstions">
                        <div className="edit_user" onClick={() => {
                          dispatch({
                            type: "addData",
                            data: doc._id
                          });
                          navigate("/admin/users/edit")
                        }}>edit</div>
                        <div className="delete_user" onClick={() => {
                          axios.post("http://localhost:9000/delete/user", {
                            id: doc._id,
                            token: auth.token,
                          }).then((res) => {
                            if (res.data.success) {
                              setSuccess(true)
                            }
                          })
                        }}>delete</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            {search !== "" &&
              filteredDocs.map((doc) => {
                return (
                  <tr key={doc._id}>
                    <td>
                      <img
                        src={
                          doc.image == null
                            ? ""
                            : `http://localhost:9000/image/${doc.image}`
                        }
                        alt="No profile"
                      />
                    </td>
                    <td>{doc.name}</td>
                    <td>{doc.phone}</td>
                    <td>{doc.email}</td>
                    <td>
                      <div className="edopstions">
                        <div className="edit_user">edit</div>
                        <div className="delete_user">delete</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {filteredDocs.length === 0 && search !== "" && (
          <div>
            <h1>No result</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
