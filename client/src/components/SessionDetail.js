import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client'
import Dialog from './Dialog'
import {UserContext} from './UserContext'
import PlayerCards from './PlayerCards'
import GameCards from './GameCards'
import Button from 'react-bootstrap/Button';
import { ShowContext, ShowProvider } from './ShowContext'


let socket;

const SessionDetail = ({ match }) => {

    const btn = useRef();
    const [show, setShow] = useContext(ShowContext);
    const [name, setName] = useContext(UserContext);
    const [sessionId, setSessionId] = useState('');
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
        console.log(show);
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
            socket.on('onCreate', () => {
                btn.current.innerText = 'Show cards';
                setShow(false);
                setCards(cards.map(card => {
                    card.isSet = false; 
                    return card;
                }));       
        
            });

            socket.on('onShow', () => {
                btn.current.innerText = 'Create a new game';
                setShow(true);
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

    const handleClick = (e) => {
        if (show) {
            socket.emit('create');
        } else {
            socket.emit('show');
        }
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "40px" }}>
            <PlayerCards cards={users} />
            </div>

            <Button ref={btn} variant="primary" onClick={handleClick}>Show cards</Button>

            <div style={{ display: "flex", justifyContent: "left", marginTop: "40px" }}>
            <GameCards display={!show} sendVote={sendVote} cards={cards} />
            </div>

            <Dialog />
        </div>

    );
}

export default SessionDetail;