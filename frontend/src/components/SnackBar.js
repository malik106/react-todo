import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SnackBar({ snack, handleClose }) {
  const {
    errorType, msg, visible,
  } = snack;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={visible}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MuiAlert elevation={6} variant="filled" severity={errorType}>
          {msg}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
}
export default SnackBar;
