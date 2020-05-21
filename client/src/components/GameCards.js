import React from 'react';
import Card from './GameCard';

const PlayerCards = (props) => {
    return props.cards.map(card => (
        <Card sendVote={props.sendVote} key={card.id} value={card.value} isSet={card.isSet}/>
    ));
}

export default PlayerCards;