import React from 'react';
import Card from './PlayerCard';

const PlayerCards = (props) => {
    return props.cards.map(card => (
        <Card key={card.id} user={card.name} hasVoted={card.hasVoted} vote={card.vote}/>
    ));
}

export default PlayerCards;