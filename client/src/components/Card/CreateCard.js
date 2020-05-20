import React from 'react';
import Card from 'react-bootstrap/Card';

const CreateCard = (props) => {

    return(
      <div>
        <Card border="primary" style={{ width: '6rem', height: '9rem' }}>
        <Card.Body>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
      {props.user}
      </div>

        )
}

export default CreateCard;