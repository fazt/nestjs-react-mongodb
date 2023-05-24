import { CreateTask, UpdateTask } from "../interface/task.interface";

const API = "http://localhost:3000/api";

export const getTasksRequest = async () => fetch(`${API}/tasks`);

export const createTaskRequest = async (task: CreateTask) =>
  fetch(`${API}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteTaskRequest = async (id: string) =>
  fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });

export const updateTaskRequest = async (id: string, task: UpdateTask) =>
  fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getTaskRequest = async (id: string) => fetch(`${API}/tasks/${id}`);
