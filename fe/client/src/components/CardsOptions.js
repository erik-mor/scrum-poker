import React from 'react';

const CardsOptions = (props) => {
    return props.sets.map(set => (
        <option value={set.id} key={set.id}>{set.cards.map(card => (
            `${card.value} `
        ))}</option>
    ))
}

export default CardsOptions;