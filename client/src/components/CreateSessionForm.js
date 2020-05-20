import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { SessionContext } from './SessionContext'


const CreateSessionForm = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [sessions, setSessions] = useContext(SessionContext);


    const handleSumbit = (e) => {
        e.preventDefault();
        const newId = uuid();
        setId(newId);
        setSessions(prev => [...prev, { id: newId, name: name }]);
        setRedirect(true);
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

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
                        <Form.Control as="select">
                            <option>1,3,8,20,50,100</option>
                            <option>1,2,3,4,5</option>
                            <option>XS,S,M,L,XL,XXL</option>
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