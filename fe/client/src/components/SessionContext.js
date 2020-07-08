import React, { useState, createContext } from 'react';
import { v1 as uuid } from 'uuid'

export const SessionContext = createContext();

export const SessionProvider = props => {

  const [sessions, setSessions] = useState([
    {
      id: 'a0b798e0-9958-11ea-8d00-fb880e21f2aa',
      name: 'Session 1'
    }
  ]);

  return <SessionContext.Provider value={[sessions, setSessions]}> {props.children} </SessionContext.Provider>

}