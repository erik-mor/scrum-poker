import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from './SessionContext'

const url = '';


const SessionDetail = ({ match }) => {

    const [sessions, setSessions] = useContext(SessionContext);
    const [session, setSession] = useState({});
    const id = match.params.id;

    useEffect(() => {
        console.log(match);
        fetchDeatils();
    }, []);


    const fetchDeatils = () => {
        setSession(sessions.filter(el => el.id === id)[0]);

    }

    return (
        <div>
            <h1>id: {session.id}</h1>
            <h1>name: {session.name} </h1>
        </div>
    );
}

export default SessionDetail;