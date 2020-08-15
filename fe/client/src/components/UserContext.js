import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("userName");
    if (name !== null) {
      setUserName(name);
    } else {
      if (userName !== "") {
        localStorage.setItem("userName", userName);
      }
    }
  }, [userName]);

  return (
    <UserContext.Provider value={[userName, setUserName]}>
      {" "}
      {props.children}{" "}
    </UserContext.Provider>
  );
};
