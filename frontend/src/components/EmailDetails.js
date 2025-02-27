import React from "react";
import { Typography, Box, Paper } from "@mui/material";

const EmailDetails = ({ email }) => {
  if (!email) {
    return (
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
    );
  }

  return (
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
          {email.subject}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(email.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography sx={{ mb: 1 }}>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          To:
        </Typography>
        {email.to}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          CC:
        </Typography>
        {email.cc}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          BCC:
        </Typography>
        {email.bcc}
      </Typography>
      <Typography sx={{ whiteSpace: "pre-line", mt: 3 }}>
        {email.body}
      </Typography>
    </Paper>
  );
};

export default EmailDetails;
