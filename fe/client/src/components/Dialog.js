import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "./UserContext";

export default function Dailog(props) {
  const DB_URL = "response.json";

  useEffect(() => {
    if (userName !== "") {
      setOpen(false);
    }
  });

  const [userName, setUserName] = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");

  const handleClose = () => {
    const checkUser = () => {
      fetch(DB_URL)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.isValid) {
            console.log(data.isValid);
            setUserName(name);
            setOpen(false);
          }
        });
    };
    checkUser();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter display name</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
