import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  Box,
  Paper,
} from "@mui/material";


const EmailsPage = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    fetchEmails();
  }, [searchText]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        searchText
          ? `http://localhost:3001/emails?q=${searchText}`
          : "http://localhost:3001/emails"
      );
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const debouncedSearch = debounce((text) => {
    setSearchText(text);
  }, 500);

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleEmailSelect = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/emails/${id}`);
      setSelectedEmail(response.data);
    } catch (error) {
      console.error(`Error fetching email ${id}:`, error);
    }
  };

  const handleComposeOpen = () => {
    setIsComposeOpen(true);
  };

  const handleComposeClose = () => {
    setIsComposeOpen(false);
    setNewEmail({ to: "", cc: "", bcc: "", subject: "", body: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmail({ ...newEmail, [name]: value });
  };

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:3001/emails", newEmail);
      fetchEmails();
      handleComposeClose();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f4f6f8",
        p: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <aside
        style={{
          width: "280px",
          borderRight: "1px solid #e0e0e0",
          p: 3,
          bgcolor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, textAlign: "center", mb: 3, color: "#333" }}
        >
          INBOX
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, marginRight: '20px' }}
          onChange={handleSearchChange}
        />
        <List sx={{ flex: 1, overflow: "hidden" }}>
          {emails?.map((email) => (
            <ListItem key={email.id} disablePadding sx={{ paddingRight: '20px' }}>
            <ListItemButton
                onClick={() => handleEmailSelect(email.id)}
                sx={{
                    p: '16px',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: '#e8e8e8' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    border: '1px solid #e0e0e0',
                    marginBottom: '8px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                        {email.to}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{fontSize: '0.6rem'}}>
                        {new Date(email.createdAt).toLocaleDateString('en-US')}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1 }}>
                    {email.subject}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {email.body}
                </Typography>
            </ListItemButton>
        </ListItem>
          ))}
        </List>
      </aside>
      <main style={{ flex: 1, p: 3 }}>
        {selectedEmail ? (
          <Paper
            sx={{
              mt: 3,
              p: 3,
              bgcolor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {selectedEmail.subject}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(selectedEmail.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography sx={{ mb: 1 }}>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                To:{" "}
              </Typography>
              {selectedEmail.to}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                CC:{" "}
              </Typography>
              {selectedEmail.cc}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                BCC:{" "}
              </Typography>
              {selectedEmail.bcc}
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line", mt: 3 }}>
              {selectedEmail.body}
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              Select an email from the list.
            </Typography>
          </Box>
        )}
      </main>
      <Button
        variant="contained"
        color="primary"
        sx={{ position: "fixed", bottom: 3, right: 3 }}
        onClick={handleComposeOpen}
      >
        Compose
      </Button>
      <Dialog
        open={isComposeOpen}
        onClose={handleComposeClose}
        fullWidth
        maxWidth="sm"
        sx={{overflowX: 'hidden'}}
      >
        <DialogTitle>Compose Email</DialogTitle>
        <DialogContent>
          <TextField
            label="To"
            name="to"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            required
          />
          <TextField
            label="CC"
            name="cc"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="BCC"
            name="bcc"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Subject"
            name="subject"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            required
          />
          <TextareaAutosize
            minRows={5}
            placeholder="Body"
            name="body"
            style={{ width: "100%", marginTop: "16px" }}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleComposeClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmailsPage;
