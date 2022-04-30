import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    margin: '15px 0',
    width: '100%',
    display: 'flex',
  },
  buttonContainer: {
    marginLeft: '10px!important',
  },
});

function AddTask(props) {
  const classes = useStyles();
  const { handleTaskAddition } = props;
  const [inputData, setInputData] = useState('');

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleAddTaskClick = (textValue) => {
    if (textValue === '') {
      toast.info('Não é possível adicionar uma tarefa em branco!');
    } else {
      handleTaskAddition(textValue);
      setInputData('');
    }
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleTaskAddition(e.target.value);
      setInputData('');
    }
  };
  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        onChange={handleInputChange}
        value={inputData}
        onKeyDown={keyPress}
        size="small"
        placeholder="Enter Task  Here..."
      />
      <Button className={classes.buttonContainer} onClick={() => { handleAddTaskClick(inputData); }} variant="contained" startIcon={<AddCircleIcon />}>
        Add
      </Button>
    </div>
  );
}

export default AddTask;
