import React, { useState, createContext } from 'react';


export const SessionContext = createContext();


export const SessionProvider = props => {

  const [sessions, setSessions] = useState([]);

  return <SessionContext.Provider value={[sessions, setSessions]}> {props.children} </SessionContext.Provider>

}