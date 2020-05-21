import React from 'react';
import Card from 'react-bootstrap/Card';

const CreatePlayerCard = (props) => {

    return(
      <div>
        <Card bg={props.isSet ? "primary" : "light"} onClick={props.sendVote.bind(this, props.value)} border="primary" style={{ width: '3rem', height: '5rem', margin: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card.Body>
          <Card.Text>
            {props.value}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

        )
}

export default CreatePlayerCard;