import React from 'react';
import Card from './GameCard';

const PlayerCards = (props) => {
    if (props.display) {
        return props.cards.map(card => (
            <Card sendVote={props.sendVote} key={card.id} value={card.value} isSet={card.isSet}/>
        ));   
    } else {
        return (
            <React.Fragment/>
        )
    }
}

export default PlayerCards;