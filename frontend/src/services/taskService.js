import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tasks`;

export const getTasks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(BASE_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${BASE_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
