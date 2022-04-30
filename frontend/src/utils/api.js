import axios from 'axios';

const baseUrl = process.env.REACT_APP_API;

export const addTodoList = async (data) => axios.post(`${baseUrl}/todos`, {
  text: data,
})
  .then((response) => response)
  .catch((error) => error);
export const getTodoList = async () => axios.get(`${baseUrl}/todos`)
  .then((response) => response)
  .catch((error) => error);

export const putTodoList = async (id, text, checked) => axios.put(`${baseUrl}/todos/${id}`, {
  text,
  checked,
})
  .then((response) => response)
  .catch((error) => error);
