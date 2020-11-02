import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function SessionSettings(props) {
  const { open, onClose, users } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Session Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
          <Tab eventKey="general" title="General">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            labore ducimus possimus odit, tempora error non natus iure inventore
            praesentium nesciunt sit repellat facere amet iusto quo porro
            molestiae magni laboriosam sunt sed pariatur? Sapiente excepturi
            illo alias. Expedita, consequatur tempora veniam iure optio ad saepe
            pariatur sit, provident dolor veritatis exercitationem? Fugit labore
            culpa mollitia veritatis iste dolor dignissimos accusantium,
            adipisci sint eligendi amet, ipsum placeat ducimus velit
            necessitatibus error ipsa aliquid illum eos dolores ab asperiores
            non nam libero. Ab adipisci facilis quod unde veniam est facere,
            praesentium magnam soluta! Vitae harum optio temporibus, rerum sunt
            eos ab.
          </Tab>
          <Tab eventKey="users" title="Users">
            <List>
              {users.map((user) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText> {user.name} </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      color="secondary"
                      edge="end"
                      aria-label="delete"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
