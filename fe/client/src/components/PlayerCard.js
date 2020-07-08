import React, { useEffect, useContext, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { ShowContext } from './ShowContext'


const CreatePlayerCard = (props) => {

  const [show, setShow] = useContext(ShowContext);

  return (
    <div>
      <Card bg={show ? "light" : props.hasVoted ? "primary" : "light"} border="primary" style={{ width: '4rem', height: '6rem', margin: "30px 5px 5px 5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card.Body>
          <Card.Text>
            {show ? props.vote : ''}
          </Card.Text>
        </Card.Body>
      </Card>
      {props.user}
    </div>

  )
}

export default CreatePlayerCard;