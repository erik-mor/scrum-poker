import React, { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import Dialog from "./Dialog";
import { UserContext } from "./UserContext";
import PlayerCards from "./PlayerCards";
import GameCards from "./GameCards";
import Button from "react-bootstrap/Button";
import { ShowContext, ShowProvider } from "./ShowContext";
import { CardContext } from "./CardContext";
import SettingsIcon from "@material-ui/icons/Settings";
import SessionSettings from "./SessionSettings";

let socket;

const SessionDetail = ({ match }) => {
  const btn = useRef();
  const [sessionSettingsOpen, setSessionSettingsOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [isMaster, setIsMaster] = useState(false);
  const [show, setShow] = useContext(ShowContext);
  const [name, setName] = useContext(UserContext);
  const [sessionId, setSessionId] = useState("");
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardSets, setCardSets] = useContext(CardContext);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const id = match.params.id;
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ session(id: "${id}") { cards, name } }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const cardValues = cardSets.filter(
          (set) => set.id === parseInt(res.data.session.cards)
        )[0].cards;
        setCards(cardValues);
        setSessionName(res.data.session.name);
      });
  }, [cardSets]);

  useEffect(() => {
    const id = match.params.id;
    setSessionId(id);

    if (name !== "") {
      socket = io(ENDPOINT);
      socket.emit("join", { name, id });

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    }
  }, [name, ENDPOINT, match.params.id]);

  useEffect(() => {
    if (name !== "") {
      socket.on("connectedUsers", ({ users }) => {
        setUsers(users);
        updateGameCards(users);
      });

      socket.on("onCreate", () => {
        btn.current.innerText = "Show cards";
        setShow(false);
      });

      socket.on("onShow", () => {
        btn.current.innerText = "Create a new game";
        setShow(true);
        setCards(
          cards.map((card) => {
            card.isSet = false;
            return card;
          })
        );
      });

      socket.on("isMaster", () => {
        setIsMaster(true);
      });
    }
  }, [name, cards]);

  const updateGameCards = (currentUsers) => {
    const user = currentUsers.find((user) => user.name === name);
    // setCards(
    //   cards.map((card) => {
    //     if (card.value === user.vote) {
    //       card.isSet = true;
    //     } else {
    //       card.isSet = false;
    //     }
    //     return card;
    //   })
    // );
  };

  const sendVote = (value) => {
    setCards(
      cards.map((card) => {
        if (card.value === value) {
          card.isSet = true;
        } else {
          card.isSet = false;
        }
        return card;
      })
    );
    socket.emit("vote", { value, id: sessionId });
  };

  const handleClick = (e) => {
    if (show) {
      socket.emit("create");
    } else {
      socket.emit("show");
    }
  };

  const handleClose = () => {
    setSessionSettingsOpen(false);
  };

  const sessionSettings = (e) => {
    setSessionSettingsOpen(true);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={sessionSettings}>
        <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
          {" "}
          {sessionName} <SettingsIcon />
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginBottom: "40px",
        }}
      >
        <PlayerCards cards={users} />
      </div>

      <Button
        ref={btn}
        variant="primary"
        onClick={handleClick}
        disabled={!isMaster}
      >
        Show cards
      </Button>

      <div
        style={{ display: "flex", justifyContent: "left", marginTop: "40px" }}
      >
        <GameCards sendVote={sendVote} cards={cards} disabled={show} />
      </div>

      <Dialog />

      <SessionSettings
        users={users}
        onClose={handleClose}
        open={sessionSettingsOpen}
      />
    </div>
  );
};

export default SessionDetail;
