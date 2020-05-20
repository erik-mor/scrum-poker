import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


const JoinSessionForm = () => {

    const [name, setName] = useState('');
    const [sessionId, setSessionId] = useState('');

    return(
        <div>
        <Form>
            <h1>Join session: </h1>
            <Form.Group controlId="formBasicEm">
                <Form.Label>Session Id: </Form.Label>
                <Form.Control onChange={e => setSessionId(e.target.value)} name="name" type="text" placeholder="Ener session id" />
            </Form.Group>

            <Form.Group controlId="formBasic">
                <Form.Label>Name:</Form.Label>
                <Form.Control onChange={e => setName(e.target.value)}  name="name" type="text" placeholder="Ener name" />
            </Form.Group>
            <Link onClick={e => (!name || !sessionId) ? e.preventDefault() : null} to={`/session?name=${name}&id=${sessionId}`}>
                <Button variant="primary" type="submit">Submit</Button>
            </Link>
        </Form>
    </div>

    )
}

export default JoinSessionForm;