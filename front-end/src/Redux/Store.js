import { createStore } from "redux";
// import React, { useState } from "react";

const initialState = {
  token: "",
  id: "",
  accountType: "",
  data: "",
}

const tokenReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "StoreToken":
      return {
        ...prevState,
        token: action.token,
        accountType: action.accountType,
        id: action.id,
      };
    case "RemoveToken":
      return {
        ...prevState,
        token: "",
        accountType: "",
        id: "",
      };

    case "addData":
      return {
        ...prevState,
        data: action.data,
      };
    case "removeData":
      return {
        ...prevState,
        data: "",
      };
    default:
      break;
  }
};

const Store = createStore(tokenReducer);

export default Store;
