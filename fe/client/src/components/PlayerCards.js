import React from "react";
import Card from "./PlayerCard";

const PlayerCards = (props) => {
  return props.cards
    .filter((card) => card.isRedundant === false)
    .map((card) => (
      <Card
        key={card.id}
        user={card.name}
        hasVoted={card.hasVoted}
        vote={card.vote}
      />
    ));
};

export default PlayerCards;
