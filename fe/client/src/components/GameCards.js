import React from "react";
import Card from "./GameCard";

const GameCards = (props) => {
  return props.cards.map((card) => (
    <Card
      disabled={props.disabled}
      sendVote={props.sendVote}
      key={card.id}
      value={card.value}
      isSet={card.isSet}
    />
  ));
};

export default GameCards;
