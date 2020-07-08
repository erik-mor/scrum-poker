import React from 'react';

const CardsOptions = (props) => {
    return props.sets.map(set => (
        <option value={set.id} key={set.id}>{set.cards.map(card => (
            `${card} `
        ))}</option>
    ))
}

export default CardsOptions;