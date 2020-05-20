import React from 'react';
import Card from './Card/CreateCard';

const CreateCards = (props) => {
    return props.cards.map(card => (
        <Card key={card.id} user={card.name} />
    ));
}

export default CreateCards;