import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledButton } from "../styles";

interface IAlertDialog {
  title: string;
  description: string;
  isOpen: boolean;
  closeAction: () => void;
  confirmAction: () => void;
}

export const AlertDialog = ({
  title,
  description,
  isOpen,
  closeAction,
  confirmAction
}: IAlertDialog) => {
  return (
    <Dialog open={isOpen} onClose={closeAction}>
      <DialogTitle
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "16px",
          color: "#333",
          fontWeight: 600
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: "13px",
            fontFamily: '"Inter", sans-serif',
            color: "#333"
          }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton color="primary" onClick={closeAction}>
          Cancel
        </StyledButton>
        <StyledButton color="primary" onClick={() => confirmAction()}>
          Delete
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};
