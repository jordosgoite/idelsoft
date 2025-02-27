import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";

const ComposeEmailDialog = ({
  open,
  onClose,
  onSend,
  newEmail,
  onInputChange,
}) => {
  const isSendDisabled = !newEmail.to || !newEmail.subject || !newEmail.body;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{ overflowX: "hidden" }}
    >
      <DialogTitle>Compose Email</DialogTitle>
      <DialogContent>
        <TextField
          label="To"
          name="to"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
        />
        <TextField
          label="CC"
          name="cc"
          fullWidth
          margin="normal"
          onChange={onInputChange}
        />
        <TextField
          label="BCC"
          name="bcc"
          fullWidth
          margin="normal"
          onChange={onInputChange}
        />
        <TextField
          label="Subject"
          name="subject"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
        />
        <TextareaAutosize
          minRows={5}
          placeholder="Body"
          name="body"
          style={{ width: "100%", marginTop: "16px" }}
          onChange={onInputChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSend} color="primary" disabled={isSendDisabled}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComposeEmailDialog;
