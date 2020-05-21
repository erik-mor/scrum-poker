import React from 'react';
import Card from './CreatePlayerCard';

const PlayerCards = (props) => {
    return props.cards.map(card => (
        <Card key={card.id} user={card.name} hasVoted={card.hasVoted}/>
    ));
}

export default PlayerCards;