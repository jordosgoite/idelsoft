// pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Container, TextField, Typography, Button, Box, Paper } from '@mui/material';
import EmailList from '../components/EmailList';
import EmailDetails from '../components/EmailDetails';
import ComposeEmailDialog from '../components/ComposeEmailDialog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function EmailsPage() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    fetchEmails();
  }, [searchText]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        searchText ? `${API_URL}/emails?q=${searchText}` : `${API_URL}/emails`
      );
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
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
      const response = await axios.get(`${API_URL}/emails/${id}`);
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
    setNewEmail({ to: '', cc: '', bcc: '', subject: '', body: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmail({ ...newEmail, [name]: value });
  };

  const handleSendEmail = async () => {
    try {
      await axios.post(`${API_URL}/emails`, newEmail);
      fetchEmails();
      handleComposeClose();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        height: '100vh',
        bgcolor: '#f4f6f8',
        p: 3,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <aside
        style={{
          width: '280px',
          borderRight: '1px solid #e0e0e0',
          p: 3,
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 3, color: '#333' }}>
          INBOX
        </Typography>
        <TextField label="Search" variant="outlined" fullWidth sx={{ mb: 2, marginRight: '20px' }} onChange={handleSearchChange} />
        <EmailList emails={emails} onSelect={handleEmailSelect} />
      </aside>
      <main style={{ flex: 1, p: 3 }}>
        <EmailDetails email={selectedEmail} />
      </main>
      <Button variant="contained" color="primary" sx={{ position: 'fixed', bottom: 3, right: 3 }} onClick={handleComposeOpen}>
        Compose
      </Button>
      <ComposeEmailDialog
        open={isComposeOpen}
        onClose={handleComposeClose}
        onSend={handleSendEmail}
        newEmail={newEmail}
        onInputChange={handleInputChange}
      />
    </Container>
  );
}

export default EmailsPage;