import React, { useState, createContext, useEffect } from "react";

export const CardContext = createContext();

export const CardProvider = (props) => {
  const [cardSets, setCardSets] = useState([
    {
      id: 0,
      cards: [
        {
          id: 0,
          value: 1,
          isSet: false,
        },
        {
          id: 1,
          value: 3,
          isSet: false,
        },
        {
          id: 2,
          value: 5,
          isSet: false,
        },
        {
          id: 3,
          value: 8,
          isSet: false,
        },
        {
          id: 4,
          value: 13,
          isSet: false,
        },
        {
          id: 5,
          value: 21,
          isSet: false,
        },
        {
          id: 6,
          value: 34,
          isSet: false,
        },
        {
          id: 7,
          value: 55,
          isSet: false,
        },
      ],
    },
    {
      id: 1,
      cards: [
        {
          id: 0,
          value: 1,
          isSet: false,
        },
        {
          id: 1,
          value: 2,
          isSet: false,
        },
        {
          id: 2,
          value: 3,
          isSet: false,
        },
        {
          id: 3,
          value: 4,
          isSet: false,
        },
        {
          id: 4,
          value: 5,
          isSet: false,
        },
      ],
    },
    {
      id: 2,
      cards: [
        {
          id: 0,
          value: "XS",
          isSet: false,
        },
        {
          id: 1,
          value: "S",
          isSet: false,
        },
        {
          id: 2,
          value: "M",
          isSet: false,
        },
        {
          id: 3,
          value: "L",
          isSet: false,
        },
        {
          id: 4,
          value: "XL",
          isSet: false,
        },
        {
          id: 5,
          value: "XXL",
          isSet: false,
        },
      ],
    },
  ]);

  return (
    <CardContext.Provider value={[cardSets, setCardSets]}>
      {" "}
      {props.children}{" "}
    </CardContext.Provider>
  );
};
