import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  var formData = new FormData();
  const [detalis, setDetalis] = useState([]);
  const [updated, setUpdated] = useState(null);
  const [image, setImage] = useState(null);
  const auth = useSelector((state) => {
    return state;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === undefined) {
      navigate("/");
    } else {
      if (auth.token === "" || auth.accountType !== "user") {
        navigate("/");
      } else {
        axios
          .post("http://localhost:9000/user", {
            token: auth.token,
            id: auth.id,
          })
          .then(function (response) {
            if (response.data.success) {
              setDetalis(response.data.details);
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = () => {
    formData.append("image", image);
    axios
      .post(`http://localhost:9000/addprofile/${auth.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setUpdated(image);
        setImage(null);
      });
  };

  const handleLogout = () => {
    dispatch({
      type: "RemoveToken",
    });
    navigate("/");
  };
  const url = `http://localhost:9000/image/${detalis.image}`;
  return (
    <div className="homeDiv">
      <div className="left_div">
        <div className="profile_div">
          {detalis.image === null && <img src="../../../nopic.png" alt="" />}
          {detalis.image !== null && (
            <img
              src={updated != null ? URL.createObjectURL(updated) : url}
              alt=""
            />
          )}
        </div>
        {image !== null && (
          <div className="changeImg_div">
            <div>
              <div className="selecte_text">Selected Image</div>
              <img src={image ? URL.createObjectURL(image) : ""} alt="" />
            </div>
            <div>
              <button onClick={handleImageChange}>Submit</button>
            </div>
          </div>
        )}

        <div className="add_profile_btn">
          {detalis.image !== null && <p className="editImage">Edit Image:</p>}

          <input
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
            value=""
            type="file"
          />
        </div>
      </div>
      <div className="right_div">
        <div className="innerRight">
          <div className="profile">
            <div className="innerProfile">
              <h1 className="profHead">Profile</h1>
              <div className="details">
            <div>Name: {detalis.name}</div> <div> Phone: {detalis.phone}</div>
            <div> Email: {detalis.email}</div>
            <div className="add_profile_btn">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
