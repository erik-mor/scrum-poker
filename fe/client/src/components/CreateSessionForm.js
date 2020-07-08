import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { SessionContext } from './SessionContext'
import CardsOptions from './CardsOptions'

const CreateSessionForm = () => {

    const [redirect, setRedirect] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [sessions, setSessions] = useContext(SessionContext);
    const [cardSets, setCardSets] = useState([
        {id: 1, cards: [1, 3, 5, 8, 13, 21, 34, 55]},
        {id: 2, cards: [1, 2, 3, 4, 5]},
        {id: 3, cards: ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
    ]);
    const [cards, setCards] = useState(cardSets[0]);

    const handleSumbit = (e) => {
        e.preventDefault();

        const newId = uuid();
        setId(newId);

        setSessions(prev => [...prev, { id: newId, name: name }]);

        setRedirect(true);

        //TODO call db
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

    const chooseCards = (e) => {
        setCards(cardSets.filter(set => set.id === parseInt(e.target.value)));
    }

    console.log(cards);

    if (redirect === true) {
        return (
            <Redirect to={`/${id}`} />
        );
    } else {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEm">
                        <Form.Label>Session Name: </Form.Label>
                        <Form.Control onChange={onChange} value={name} name="name" type="text" placeholder="Ener name" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Choose cards:</Form.Label>
                        <Form.Control onChange={chooseCards} as="select">
                            <CardsOptions sets={cardSets} />
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={handleSumbit} variant="primary" type="submit">
                        Submit
                 </Button>
                </Form>
            </div>

        );
    }
}

export default CreateSessionForm;