import React, { useEffect, useState, useContext, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import Dialog from './Dialog'
import {UserContext} from './UserContext'
import PlayerCards from './PlayerCards'
import GameCards from './GameCards'

let socket;

const SessionDetail = ({ match, location }) => {

    const [name, setName] = useContext(UserContext);
    const [sessionId, setSessionId] = useState('');
    const [vote, setVote] = useState('');
    const [users, setUsers] = useState([]);
    const [votes, setVotes] = useState([]);
    const [cards, setCards] = useState([
        {
           id: 1,
           value: "1",
           isSet: false
        }, 
        {
            id: 2,
            value: "2",
            isSet: false
        }
    ]);

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
            socket.on('onVote', vote => {
                setVotes([...votes, vote]);
            });

            socket.on('connectedUsers', ({users}) => {
                setUsers(users);
            })
        }
    });

    const sendVote = (value) => {
        console.log('Send vote', value);

        setCards(cards.map(card => {
            if (card.value === value) {
                card.isSet = true;
            } else {
                card.isSet = false;
            }
            return card;
        }));       

        socket.emit('vote', {value, id: sessionId});
    }   

    return (
        <div>

            <div style={{ display: "flex", justifyContent: "left" }}>
             <PlayerCards cards={users} />
            </div>

            <div style={{ display: "flex", justifyContent: "left", marginTop: "40px" }}>
             <GameCards sendVote={sendVote} cards={cards} />
            </div>


            <Dialog />
        </div>

    );
}

export default SessionDetail;