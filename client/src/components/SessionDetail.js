import React, { useEffect, useState, useContext, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import Dialog from './Dialog'
import {UserContext} from './UserContext'
import Card from './Card/CreateCard.js'
import Cards from './SetCards'

let socket;

const SessionDetail = ({ match, location }) => {

    const [name, setName] = useContext(UserContext);
    const [sessionId, setSessionId] = useState('');
    const [vote, setVote] = useState('');
    const [users, setUsers] = useState([]);
    const [votes, setVotes] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const id = match.params.id;
        setSessionId(id);

        if (name !== '') {
            socket = io(ENDPOINT);
            socket.emit('join', {name, id});

            return () => {
                socket.emit('disconnect');
                socket.off();   
            }    
        }   
        
    },[name, ENDPOINT, match.params.id]);

    useEffect(() => {
        if (name !== '') {
            console.log('Here')
            socket.on('onVote', vote => {
                setVotes([...votes, vote]);
            });

            socket.on('connectedUsers', ({users}) => {
                console.log('Setting users');
                setUsers(users);
            })
        }
    });

    const sendVote = (e) => {
        e.preventDefault();
        socket.emit('vote', {user: name, id: sessionId, value: 'voted'});
    }   

    console.log(votes, users);

    return (
        <div>
            <h1>id: {sessionId}</h1>
            <h1>name: {name} </h1>

            <Cards cards={users} />

            <Dialog />
        </div>

    );
}

export default SessionDetail;