import React, { useContext, useState } from "react";
import { Fab, Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

interface CreatePostButtonProps {
  username: string | null;
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ username }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log("user in createpostbutton user is : " + username);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/posts/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        username: username,
        userAvatar: "http://example.com/avatar.jpg", // replace with actual avatar URL
        title: title,
        content: content,
        imageUrl: "http://example.com/image.jpg", // replace with actual image URL
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Fab color="primary" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden />
          </Button>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={4}
            fullWidth
          />
          <Button color="primary" onClick={handlePublish}>
            Publish
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostButton;
