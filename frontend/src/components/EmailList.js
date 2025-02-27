import React from "react";
import { List, ListItem, ListItemButton, Typography, Box } from "@mui/material";

const EmailList = ({ emails, onSelect }) => {
  return (
    <List sx={{ flex: 1, overflow: "hidden" }}>
      {emails?.map((email) => (
        <ListItem key={email.id} disablePadding sx={{ paddingRight: "20px" }}>
          <ListItemButton
            onClick={() => onSelect(email.id)}
            sx={{
              p: "16px",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#e8e8e8" },
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              border: "1px solid #e0e0e0",
              marginBottom: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {email.to}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.6rem" }}
              >
                {new Date(email.createdAt).toLocaleDateString("en-US")}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                mb: 1,
              }}
            >
              {email.subject}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {email.body}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default EmailList;
