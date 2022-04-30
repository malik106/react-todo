import React, { useState, useEffect } from 'react';
import './App.css';
import { Paper } from '@mui/material';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { addTodoList, getTodoList, putTodoList } from './utils/api';
import NoData from './assets/images/data-not-found.png';
import SnackBar from './components/SnackBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [snack, setSnack] = useState({ visible: false, msg: '', errorType: 'success' });
  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTodoList();
      const { data, response } = result;

      if (data !== undefined) {
        setTasks(data);
      }
      if (response && response.status !== 200) {
        setSnack({
          visible: true, msg: 'Somting went to wrong', errorType: 'error',
        });
      }
    };
    fetchTasks();
  }, []);

  const handleTaskClick = async (id, checked, text) => {
    const result = await putTodoList(id, text, checked);
    const { data: updateCheked, response } = result;
    if (result.status === 200) {
      setSnack({
        visible: true, msg: 'Successfully updated task', errorType: 'success',
      });
    }
    if (response && response.status !== 200) {
      setSnack({
        visible: true, msg: 'Somting went to wrong', errorType: 'error',
      });
      return;
    }
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, ...updateCheked };
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleTaskAddition = async (taskTitle) => {
    const result = await addTodoList(taskTitle);
    const { data: todoAddData, response } = result;
    if (result.status === 200) {
      setSnack({
        visible: true, msg: 'Successfully added new task', errorType: 'success',
      });
    }
    if (response && response.status !== 200) {
      setSnack({
        visible: true, msg: 'Somting went to wrong', errorType: 'error',
      });
      return;
    }
    const newTasksData = [...[todoAddData], ...tasks];
    setTasks(newTasksData);
  };

  return (
    <Paper elevation={3} className="container">
      <Header />
      <AddTask handleTaskAddition={handleTaskAddition} />
      {tasks.length > 0
        ? (
          <Tasks
            tasks={tasks}
            handleTaskClick={handleTaskClick}
          />
        )
        : (
          <div style={{ textAlign: 'center' }}>
            <img src={NoData} alt="Not found" />
          </div>
        )}
      <SnackBar
        snack={snack}
        handleClose={() => {
          setSnack(
            { visible: false, msg: 'sdfsd', errorType: 'success' },
          );
        }}
      />
    </Paper>
  );
}

export default App;
