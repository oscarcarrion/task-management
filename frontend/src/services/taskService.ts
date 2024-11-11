import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:3001";

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, { title });
    return response.data;
  },
};
