import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { TextField, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles({
  listItemContainer: {
    marginBottom: '10px!important',
    borderRadius: '4px',
    background: '#fafafa',
    border: '1px solid #e8e8e8',
    borderBottom: '1px solid rgba(0,0,0,.06)',
  },
  overFlow: {
    overflow: 'auto',
  },
});

function Tasks({ tasks, handleTaskClick }) {
  const classes = useStyles();
  const [editItem, setEditItem] = useState({});
  const [inputData, setInputData] = useState('');

  const handleClickEdit = (item) => {
    setEditItem(item);
  };

  const handleClickSave = (item) => {
    handleTaskClick(item.id, item.checked, inputData);
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleClickSave(editItem);
      setInputData(e.target.value);
    }
  };
  return (
    <List sx={{ width: '100%' }}>
      {tasks.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (

          <ListItem
            className={classes.listItemContainer}
            style={{ background: value.checked ? '#e6ecf6' : '#fafafa' }}
            key={value.id}
            secondaryAction={(
              value === editItem
                ? (
                  <Tooltip title="Save">
                    <IconButton edge="end" onClick={() => { handleClickSave(value); }}>
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                )
                : (
                  <Tooltip title="Edit">
                    <IconButton edge="end" onClick={() => { handleClickEdit(value); }}>
                      <EditTwoToneIcon />
                    </IconButton>
                  </Tooltip>
                )
            )}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.checked}
                  disableRipple
                  onChange={() => handleTaskClick(value.id, !value.checked, value.text)}
                />
              </ListItemIcon>
              {value === editItem
                ? (
                  <TextField
                    fullWidth
                    onChange={handleInputChange}
                    value={inputData || value.text}
                    onKeyDown={keyPress}
                    size="small"
                  />
                )
                : <ListItemText className={classes.overFlow} id={labelId} primary={value.text} />}
            </ListItemButton>
          </ListItem>

        );
      })}
    </List>
  );
}

export default Tasks;
