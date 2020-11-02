import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SessionContext } from "./SessionContext";
import CardsOptions from "./CardsOptions";
import { CardContext } from "./CardContext";

const CreateSessionForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [cards, setCards] = useState(0);
  const [cardSets, setCardSets] = useContext(CardContext);

  const handleSumbit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { newSession(name: "${name}", cards: ${cards}) { id } }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setId(res.data.newSession.id);
      });

    setRedirect(true);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const chooseCards = (e) => {
    setCards(e.target.value);
  };

  console.log(cards);

  if (redirect === true) {
    return <Redirect to={`/${id}`} />;
  } else {
    return (
      <div>
        <Form style={{ paddingTop: "40px" }}>
          <Form.Group controlId="formBasicEm">
            <Form.Label>Session Name: </Form.Label>
            <Form.Control
              autoComplete="off"
              onChange={onChange}
              value={name}
              name="name"
              type="text"
              placeholder="Ener name"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Choose cards:</Form.Label>
            <Form.Control onChange={chooseCards} as="select">
              <CardsOptions sets={cardSets} />
            </Form.Control>
          </Form.Group>
          <Button onClick={handleSumbit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
};

export default CreateSessionForm;
