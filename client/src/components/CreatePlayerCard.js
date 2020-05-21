import React from 'react';
import Card from 'react-bootstrap/Card';

const CreatePlayerCard = (props) => {

    return(
      <div>
        <Card bg={props.hasVoted ? "primary" : "light"} border="primary" style={{ width: '6rem', height: '9rem', margin: "30px 5px 5px 5px"}}>
        <Card.Body>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
      {props.user}
      </div>

        )
}

export default CreatePlayerCard;