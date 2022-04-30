import { Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    fontSize: '20px!important',
  },
});

function Header() {
  const classes = useStyles();

  return <Typography className={classes.root}>Todo List</Typography>;
}

export default Header;
