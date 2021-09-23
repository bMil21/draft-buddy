import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

interface ConfirmDialogProps {
  title?: string;
  content: string;
  cancel: () => unknown;
  confirm: () => unknown;
}

function ConfirmDialog(props: ConfirmDialogProps): JSX.Element {
  return (
    <Dialog
      open={true}
    >
      {props.title ? <DialogTitle>{props.title}</DialogTitle> : null}
      <DialogContent>
        <p>{props.content}</p>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.cancel()}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => props.confirm()}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
