import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserNavComp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch({
            type: 'RemoveToken',
        });
        navigate('/');
    };


    

    return (
        <div className="nav">
      <div className="brand">
        <h2>WooFF!</h2>
      </div>
      <div className="nav_menu">        
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
    )
}

export default UserNavComp;