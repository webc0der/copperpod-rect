import axios from 'axios';

const API_URL = 'https://6656fb4b9f970b3b36c773b9.mockapi.io/todos/v1/task';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (title: string) => {
  const response = await axios.post(API_URL, { title, completed: false });
  return response.data;
};

export const updateTodo = async (id: number, updatedTodo: Partial<{ title: string; completed: boolean }>) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
