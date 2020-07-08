import React, { useState, createContext } from 'react';

export const ShowContext = createContext();

export const ShowProvider = props => {

  const [show, setShow] = useState(false);

  return <ShowContext.Provider value={[show, setShow]}> {props.children} </ShowContext.Provider>

}